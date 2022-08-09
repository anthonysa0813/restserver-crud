const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
} = require("../controllers/user");
const { isValidEmail, isValidId } = require("../helpers/isValidEmail");
const isValidRole = require("../helpers/isValidRole");
const { validationFields } = require("../middlewares/validationField");

const router = Router();

router.get("/", userGet);
router.post(
  "/",
  [
    check("name", "The name is require").not().isEmpty(),
    check("password", "The password is require and could be more 6 characters")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("email").custom(isValidEmail),
    // check("rol", "The rol is invalid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(isValidRole),
    validationFields,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "The id is required").isMongoId(),
    check("id").custom(isValidId),
    validationFields,
  ],
  userPut
);

router.patch("/", userPatch);

router.delete(
  "/:id",
  [
    check("id", "The id is required").isMongoId(),
    check("id").custom(isValidId),
    validationFields,
  ],
  userDelete
);

module.exports = router;
