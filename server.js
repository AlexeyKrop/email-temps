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
      message:
        "This is a message placeholder. Lorem ipsum dolor sit amet consectetur. Convallis quis urna nisl sed sagittis ultrices. Quam ultricies sagittis cursus nec id tellus.",
    },
  },
  {
    filename: "program_invite",
    templatePath: "./email-templates/program_invite.pug",
    templateData: {
      programInviteLink: "https://pugjs.org/language/mixins.html",
    },
  },
  {
    filename: "application_submitted_insured",
    templatePath: "./email-templates/application_submitted_insured.pug",
    templateData: {
      viewRiskLink: "https://pugjs.org/language/mixins.html",
      riskNumber: "31254-042",
      insuredName: "ABC Trucking",
    },
  },
  {
    filename: "application_submitted_underwriter",
    templatePath: "./email-templates/application_submitted_underwriter.pug",
    templateData: {
      reviewRiskLink: "https://pugjs.org/language/mixins.html",
      contactInsuredLink: "https://pugjs.org/language/mixins.html",
      riskNumber: "31254-042",
      insuredName: "ABC Trucking",
      riskStatus: "READY_TO_REVIEW",
      coverages: [
        { name: "Auto Liability", quote: "A1184098" },
        { name: "Motor Truck Package", quote: "M1127302" },
      ],
      insuredDetails: {
        email: "jeremy_garfield@trucksecure.com",
        phone: "(775) 691-5424",
        effectiveDate: "2024-07-31",
      },
      bannerLogo: "https://v3-staging-public.s3.amazonaws.com/media/ready_to_review.png",
    },
  },
  {
    filename: "approved_risk",
    templatePath: "./email-templates/approved_risk.pug",
    templateData: {
      viewQuoteLink: "https://pugjs.org/language/mixins.html",
      riskNumber: "31254-042",
      insuredName: "ABC Trucking",
      riskStatus: "APPROVED",
      coverages: [
        { name: "Auto Liability", quote: "A1184098", price: 14070.8 },
        { name: "Motor Truck Package", quote: "M1127302", price: 23254.06 },
        { name: "Motor Truck Package", quote: "M11273022", price: 23254 },
      ],
      insuredDetails: {
        email: "jeremy_garfield@trucksecure.com",
        phone: "(775) 691-5424",
        effectiveDate: "2024-07-31",
      },
      bannerLogo: "https://v3-staging-public.s3.amazonaws.com/media/approved.png",
    },
  },
  {
    filename: "application_submitted_agent",
    templatePath: "./email-templates/application_submitted_agent.pug",
    templateData: {
      viewRiskLink: "https://pugjs.org/language/mixins.html",
      riskNumber: "31254-042",
      insuredName: "ABC Trucking",
      coverages: [
        { name: "Auto Liability", quote: "A1184098" },
        { name: "Motor Truck Package", quote: "M1127302" },
      ],
      insuredDetails: {
        email: "jeremy_garfield@trucksecure.com",
        phone: "(775) 691-5424",
        effectiveDate: "2024-07-31",
      },
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
