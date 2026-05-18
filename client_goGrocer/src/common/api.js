import axios from 'axios';
import protobuf from 'protobufjs';

const getHeaders = () => { return { 'Content-Type': 'application/x-protobuf', 'Accept': 'application/x-protobuf' }; };

export const postProto = async (url, payload, protoStr, reqMsgName, resMsgName) => {
 try {
  console.log(`[API POST] Requesting ${url}`, "Payload:", payload);
  const root = protobuf.parse(protoStr).root; //.proto string ko parse karta hai.
  const ReqType = root.lookupType(reqMsgName);
  const ResType = root.lookupType(resMsgName);

  const errMsg = ReqType.verify(payload);
  if (errMsg) throw new Error(errMsg);

  const uint8Array = ReqType.encode(ReqType.create(payload)).finish();
  // In React Native, Axios handles ArrayBuffer better than Uint8Array
  const buffer = uint8Array.slice().buffer;

  const response = await axios.post(url, buffer, {
   headers: getHeaders(),
   responseType: 'arraybuffer',
   transformRequest: [(data) => data] // Prevent Axios from stringifying binary data
  });

  const decoded = ResType.decode(new Uint8Array(response.data));
  const result = ResType.toObject(decoded, { defaults: true });
  console.log(`[API POST] Response SUCCESS from ${url}`, result);
  return result;
 } catch (error) {
  console.error("[API POST] Error:", error);
  throw error;
 }
};



export const getProto = async (url, protoStr, resMsgName) => {
 try {
  const root = protobuf.parse(protoStr).root;
  const ResType = root.lookupType(resMsgName);

  const response = await axios.get(url, {
   headers: getHeaders(),
   responseType: 'arraybuffer'
  });

  const decoded = ResType.decode(new Uint8Array(response.data));
  return ResType.toObject(decoded, { defaults: true });
 } catch (error) {
  console.error("API GET Error:", error);
  throw error;
 }
};
