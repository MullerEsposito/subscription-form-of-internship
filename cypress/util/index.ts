import { CyHttpMessages } from "../../node_modules/cypress/types/net-stubbing";

interface IGetFieldsFormData {
  field: string;
  value: string;
}

export function getFieldsFormData(req: CyHttpMessages.IncomingRequest): IGetFieldsFormData[] {
  let contentType = String(req.headers['content-type']);
  const boundaryPrefix = 'boundary=';
        
  const contentTypeArray = contentType.split(';').map(item => item.trim());      
  const boundary = contentTypeArray
    .find(item => item.startsWith(boundaryPrefix))
    .slice(boundaryPrefix.length)
    .trim();
        
  const decoder = new TextDecoder();      
        
  const rawDataArray = decoder.decode(req.body).split(boundary);
  rawDataArray.shift();
  rawDataArray.pop();
              
  const formData = rawDataArray.map(row => {
    const matchs = row.match(/(?:name="(.+)"(?:\r\n\r\n|.*filename=")(.+)(?:\r\n--|"))/);
  
    return { field: matchs[1], value: matchs[2] };
  });

  return formData;
}
