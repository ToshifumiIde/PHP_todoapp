"use strict";

{
  console.log("こんにちは！");
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      checkbox.parentNode.submit();
    });
  });

  const deletes = document.querySelectorAll(".delete");
  deletes.forEach((span) => {
    span.addEventListener("click", () => {
      if(!confirm("Are You Sure ?")){
        return;
      }
      span.parentNode.submit();
    });
  });
}
