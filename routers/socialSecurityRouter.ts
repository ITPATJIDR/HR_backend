const socialSecurityRateController = require("../controllers/socialSecurityControllers")
const socialSecurityRateRouter = require("express").Router();

socialSecurityRateRouter.post("/createSocialSecurityRate",socialSecurityRateController.createSocialSecurityRate)
socialSecurityRateRouter.post("/updateSocialSecurityRate",socialSecurityRateController.updateSocialSecurityRate)
socialSecurityRateRouter.get("/getSocialSecurityRate",socialSecurityRateController.getSocialSecurityRate)

module.exports = socialSecurityRateRouter