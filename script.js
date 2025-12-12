$(function () {
  const $form = $("#registrationForm");

  function showFieldError($input, $errorEl, message) {
    $input.addClass("is-invalid").css("border-color", "red");
    $errorEl.text(message).show();
  }

  function clearFieldError($input, $errorEl) {
    $input.removeClass("is-invalid").css("border-color", "");
    $errorEl.text("").hide();
  }

  function showInlineError($el, message) {
    $el.text(message).show();
  }

  function clearInlineError($el) {
    $el.text("").hide();
  }

  function validateRequired($input, $errorEl) {
    const value = $.trim($input.val());
    if (value === "") {
      showFieldError($input, $errorEl, "this filed must not be empty");
      return false;
    }
    clearFieldError($input, $errorEl);
    return true;
  }

  function validateTopics() {
    const anyChecked = $(".topic:checked").length > 0;
    if (!anyChecked) {
      showInlineError($("#topicError"), "At least one topic must be selected");
      return false;
    }
    clearInlineError($("#topicError"));
    return true;
  }

  function validateGender() {
    const genderVal = $("#gender").val();
    if (genderVal === "") {
      showInlineError($("#genderError"), "please choose your gender");
      return false;
    }
    clearInlineError($("#genderError"));
    return true;
  }

  function validateConfirmMatch() {
    const pwd = $("#password").val();
    const confirmPwd = $("#confirmPassword").val();

    if ($.trim(confirmPwd) !== "" && $.trim(pwd) !== "" && confirmPwd !== pwd) {
      showFieldError(
        $("#confirmPassword"),
        $("#confirmPasswordError"),
        "confirmed password mismatched the password"
      );
      return false;
    }
    return true;
  }

  // Clear errors while typing
  $("#username").on("input", function () {
    clearFieldError($("#username"), $("#usernameError"));
    $("#successMsg").addClass("d-none");
  });

  $("#email").on("input", function () {
    clearFieldError($("#email"), $("#emailError"));
    $("#successMsg").addClass("d-none");
  });

  $("#password").on("input", function () {
    clearFieldError($("#password"), $("#passwordError"));
    if (
      $("#confirmPassword").hasClass("is-invalid") &&
      $("#confirmPassword").val() === $(this).val()
    ) {
      clearFieldError($("#confirmPassword"), $("#confirmPasswordError"));
    }
    $("#successMsg").addClass("d-none");
  });

  $("#confirmPassword").on("input", function () {
    clearFieldError($("#confirmPassword"), $("#confirmPasswordError"));
    $("#successMsg").addClass("d-none");
  });

  $(".topic").on("change", function () {
    if ($(".topic:checked").length > 0) clearInlineError($("#topicError"));
    $("#successMsg").addClass("d-none");
  });

  $("#gender").on("change", function () {
    if ($(this).val() !== "") clearInlineError($("#genderError"));
    $("#successMsg").addClass("d-none");
  });

  // Submit
  $form.on("submit", function (e) {
    e.preventDefault();
    $("#successMsg").addClass("d-none");

    const okUsername = validateRequired($("#username"), $("#usernameError"));
    const okEmail = validateRequired($("#email"), $("#emailError"));
    const okPassword = validateRequired($("#password"), $("#passwordError"));
    const okConfirm = validateRequired($("#confirmPassword"), $("#confirmPasswordError"));

    const okTopics = validateTopics();
    const okGender = validateGender();

    // mismatch check only on submit (as required)
    const okMatch = okConfirm && okPassword ? validateConfirmMatch() : true;

    const allOk =
      okUsername && okEmail && okPassword && okConfirm && okTopics && okGender && okMatch;

    if (allOk) {
      $("#successMsg").removeClass("d-none");
    }
  });
});
