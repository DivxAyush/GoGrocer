const axios = require('axios');
const protobuf = require('protobufjs');

const protoStr = `
syntax = "proto3";
message Retailer_V_1_0ControllerRequest { string mobile = 1; }
message XJsRetailerDetails_V_1_0 { string Retailerid = 1; string Retailername = 2; string address = 3; string email = 4; string mobileNo = 5; string syncid = 6; string roleid = 7; string userid = 8; string contactPerson = 9; string city = 10; string salesPerson = 11; string UserName = 12; string Pwd = 13; }
message Retailer_V_1_0ControllerRequestlist { repeated XJsRetailerDetails_V_1_0 data = 1; }
`;

async function test() {
    try {
        const root = protobuf.parse(protoStr).root;
        const ReqType = root.lookupType('Retailer_V_1_0ControllerRequest');
        const ResType = root.lookupType('Retailer_V_1_0ControllerRequestlist');

        const payload = { mobile: "5365565656" };
        const buffer = ReqType.encode(ReqType.create(payload)).finish();

        console.log("Buffer length:", buffer.length);

        const response = await axios.post('https://new.grahaak.com/api/RetailerApi/RT_RetailerApp_UserDetails/RetailerApp_UserDetails', buffer, {
            headers: {
                'Content-Type': 'application/x-protobuf',
                'Accept': 'application/x-protobuf'
            },
            responseType: 'arraybuffer'
        });

        console.log("Response length:", response.data.length);
        const decoded = ResType.decode(new Uint8Array(response.data));
        console.log("Decoded:", ResType.toObject(decoded, { defaults: true }));
    } catch (e) {
        console.error(e.message);
        if (e.response) {
            console.error("Status:", e.response.status);
            console.error("Data:", e.response.data.toString());
        }
    }
}

test();
