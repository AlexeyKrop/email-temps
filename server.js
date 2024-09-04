const pug = require("pug");
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "output");
function cleanOutputDirectory() {
  if (fs.existsSync(outputDir)) {
    fs.readdirSync(outputDir).forEach((file) => {
      const filePath = path.join(outputDir, file);
      fs.unlinkSync(filePath);
    });
  } else {
    fs.mkdirSync(outputDir);
  }
}
cleanOutputDirectory();

const commonConfig = {
  bsrLogo: "https://v3-staging-public.s3.amazonaws.com/media/Blackshield.png",
  producerLogo: "https://v3-staging-public.s3.amazonaws.com/3/media/One80_logo.png",
  primaryColor: "#139FDA",
  termsOfUseLink: "https://client-portal.blackshieldrisk.com/terms",
  privacyPolicyLink: "https://client-portal.blackshieldrisk.com/privacy",
  blackShieldPromoLink: "https://www.blackshieldit.com",
  programCompanyName: "One80 Intermediaries",
  сompanyName: "ICSA",
  programCompanyAddress: "1 Integrity Pkwy, Highland Heights, OH 44143",
  template: "with_margin_light",
};

const templates = [
  {
    filename: "verification_code",
    templatePath: "./email-templates/verification_code.pug",
    templateData: {
      verificationCode: "087576",
    },
  },
  {
    filename: "application_invite",
    templatePath: "./email-templates/application_invite.pug",
    templateData: {
      applicationInviteLink: "https://www.unisender.com/ru/blog/kak-sverstat-pismo-instruktsiya-dlya-chaynikov/",
    },
  },
  {
    filename: "program_invite",
    templatePath: "./email-templates/program_invite.pug",
    templateData: {
      applicationInviteLink: "https://pugjs.org/language/mixins.html",
    },
  },
];

templates.forEach((template) => {
  const html = pug.renderFile(path.join(__dirname, template.templatePath), {
    ...commonConfig,
    ...template.templateData,
  });

  const outputFilename = `${template.filename}_${Date.now()}.html`;
  fs.writeFileSync(path.join(outputDir, outputFilename), html);
});

console.log("HTML file created successfully.");
