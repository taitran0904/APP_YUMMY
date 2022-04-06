export function generateImage(file: any) {
  let fileType = "";
  if (file?.filename?.includes(".")) {
    const uriParts = file?.filename?.split(".");
    fileType = uriParts[uriParts.length - 1];
  }

  return {
    uri: file.uri,
    name: file.filename,
    type: `image/${fileType}`,
  };
}
