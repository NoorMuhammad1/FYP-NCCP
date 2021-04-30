const http = require("http");
const ftp = require("basic-ftp");
var ftpClient = require("ftp-client");
exports.shareData = async (req, res) => {
  client = new ftpClient(
    {
      host: "124.16.144.48",
      port: 21,
      user: "vsftpd",
      password: "ftp@im",
    },
    { logging: "basic" }
  );

  client.connect(() => {
    console.log("connected baaby");
  });

  // const client = new ftp.Client();
  // client.ftp.verbose = true;

  // try {
  //   await client.access({
  //     host: "124.16.144.48",
  //     user: "vsftpd",
  //     password: "ftp@im",
  //     secure: true,
  //   });
  //   // console.log(await client.list());
  // } catch (error) {
  //   console.log(error);
  // }
  // client.close();
};

async function example() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: "myftpserver.com",
      user: "very",
      password: "password",
      secure: true,
    });
    console.log(await client.list());
    await client.uploadFrom("README.md", "README_FTP.md");
    await client.downloadTo("README_COPY.md", "README_FTP.md");
  } catch (err) {
    console.log(err);
  }
  client.close();
}
