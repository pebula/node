<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/nesbus](./nesbus.md) &gt; [SbSubscriberMetadataOptions](./nesbus.sbsubscribermetadataoptions.md) &gt; [serverId](./nesbus.sbsubscribermetadataoptions.serverid.md)

## SbSubscriberMetadataOptions.serverId property

The unique id of the server that this emitter should use as the underlying listener. This should match the server name defined in `SgServerOptions.name`<!-- -->.

By default `SgServerOptions.name` is not set, which is the identifier for the default server. A multi-server environment is not required in most of the scenarios, if that is the case do not set this value.

**Signature:**

```typescript
serverId?: string;
```