import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "productes",
    Key: {
      sku: event.requestContext.identity.cognitoIdentityId,
      upc: event.pathParameters.id
    },
    UpdateExpression:
      "SET title = :title, barcode = :barcode,content = :content, bbquantity = :bbquantity,ssquantity = :ssquantity,attachment =:attachment",
    ExpressionAttributeValues: {
      ":title": data.title || null,
      ":barcode": data.barcode || null,
      ":content": data.content || null,
      ":bbquantity": data.bbquantity || null,
      ":ssquantity": data.ssquantity || null,
      ":attachment": data.attachment || null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
