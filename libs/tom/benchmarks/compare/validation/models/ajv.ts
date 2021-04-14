export const BasicModelAJV = {
  "$id": "http://example.com/schemas/defs.json",
  "type": "object",
  "properties": {
    "number": { "type": "integer" },
    "negNumber": { "type": "integer", "maximum": 0 },
    "maxNumber": { "type": "integer", "maximum": 550 },
    "strings": { "type": "array", "items": { "type": "string" } },
    "longString": { "type": "string" },
    "boolean": { "type": "boolean" },
    "deeplyNested": {
      "type": "object",
      "properties": {
          "foo": { "type": "string" },
          "num": { "type": "integer" },
          "bool": { "type": "boolean" },
      },
      "required": ["foo", "num", "bool"],
    },
  },
  "required": ["number", "negNumber", "maxNumber", "strings", "longString", "boolean", "deeplyNested"],
};
