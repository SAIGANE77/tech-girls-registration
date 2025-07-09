
function doPost(e) {
  try {
    const folder = DriveApp.getFolderById("1ISnHl81fgZbx5Bq9cRKbUR7eer7OfA2l");
    const sheet = SpreadsheetApp.openById("1iyqqqTQ9n_ZpwOcHJNvrvVhXFlO_asFACXLDWoAYtEo").getSheetByName("Sheet1");

    const base64 = e.parameter.file;
    const fileName = e.parameter.fileName;
    const fileType = e.parameter.fileType;

    if (!base64 || !fileName || !fileType) {
      throw new Error("Missing file data");
    }

    const blob = Utilities.newBlob(Utilities.base64Decode(base64), fileType, fileName);
    const uploaded = folder.createFile(blob);
    const fileUrl = uploaded.getUrl();

    sheet.appendRow([
      new Date(),
      e.parameter.name,
      e.parameter.phone,
      e.parameter.email,
      e.parameter.college,
      fileUrl
    ]);

    return ContentService.createTextOutput("success");
  } catch (error) {
    return ContentService.createTextOutput("error: " + error.message);
  }
}
