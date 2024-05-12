import { IApiDocumenterPluginManifest, IMarkdownDocumenterFeatureOnBeforeWritePageArgs, IMarkdownDocumenterFeatureOnFinishedArgs, MarkdownDocumenterFeature, PluginFeatureInitialization } from '@microsoft/api-documenter';
import { ApiFunction, ApiMethodSignature, ApiInterface, ApiPropertySignature } from '@microsoft/api-extractor-model';

const RETURNS_EXP = "**Returns:**";

class FixMarkdownForMdxApiDocumenterPlugin extends MarkdownDocumenterFeature {
    constructor(initialization: PluginFeatureInitialization) {
        super(initialization);
    }

    onInitialized() {
        super.onInitialized();
    }

    onBeforeWritePage(eventArgs: IMarkdownDocumenterFeatureOnBeforeWritePageArgs) {
        super.onBeforeWritePage(eventArgs);

        const { apiItem } = eventArgs;

        if (apiItem instanceof ApiMethodSignature || apiItem instanceof ApiFunction) {
            if (apiItem.parameters.filter(p => p.parameterTypeExcerpt?.text.includes("{")).length > 0) {
                let pageContent = eventArgs.pageContent;
                let startIdx = pageContent.indexOf("<tbody>", pageContent.indexOf("## Parameters"));
                const endIdx = pageContent.indexOf("</tbody>", startIdx);
                while (true) {
                    const idx = pageContent.indexOf("{", startIdx);
                    if (idx === -1 || idx > endIdx)
                        break;
                    if (pageContent[idx - 1] === '\\') {
                        startIdx = idx + 1;
                        continue;
                    }
                    pageContent = pageContent.substr(0, idx) + "\\" + pageContent.substr(idx);
                    startIdx = idx + 2;
                }
                startIdx = endIdx;
                eventArgs.pageContent = pageContent;
            }
            if (apiItem.returnTypeExcerpt?.text.includes("{")) {
                let pageContent = eventArgs.pageContent;
                let startIdx = pageContent.indexOf(RETURNS_EXP);
                startIdx = pageContent.indexOf(apiItem.returnTypeExcerpt.text[0], startIdx + RETURNS_EXP.length);
                const endIdx = pageContent.indexOf("\n", startIdx);
                while (true) {
                    const idx = pageContent.indexOf("{", startIdx);
                    if (idx === -1 || idx > endIdx)
                        break;
                    if (pageContent[idx - 1] === '\\') {
                        startIdx = idx + 1;
                        continue;
                    }
                    pageContent = pageContent.substr(0, idx) + "\\" + pageContent.substr(idx);
                    startIdx = idx + 2;
                }
                startIdx = endIdx;
                eventArgs.pageContent = pageContent;
            }
        } else if (apiItem instanceof ApiInterface) {
            if (apiItem.members.filter(p => p instanceof ApiPropertySignature && p.propertyTypeExcerpt?.text.includes("{")).length > 0) {
                let pageContent = eventArgs.pageContent;
                let startIdx = pageContent.indexOf("<tbody>", pageContent.indexOf("## Properties"));
                const endIdx = pageContent.indexOf("</tbody>", startIdx);
                while (true) {
                    const idx = pageContent.indexOf("{", startIdx);
                    if (idx === -1 || idx > endIdx)
                        break;
                    if (pageContent[idx - 1] === '\\') {
                        startIdx = idx + 1;
                        continue;
                    }
                    pageContent = pageContent.substr(0, idx) + "\\" + pageContent.substr(idx);
                    startIdx = idx + 2;
                }
                startIdx = endIdx;
                eventArgs.pageContent = pageContent;
            }
        }
    }

    onFinished(eventArgs: IMarkdownDocumenterFeatureOnFinishedArgs) {
        super.onFinished(eventArgs);
    }
}

export const apiDocumenterPluginManifest = {
    manifestVersion: 1000,
    features: [
        {
            featureName: 'main',
            kind: 'MarkdownDocumenterFeature',
            subclass: FixMarkdownForMdxApiDocumenterPlugin
        }
    ]
} satisfies IApiDocumenterPluginManifest;