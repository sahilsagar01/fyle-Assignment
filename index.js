let modalCont = document.querySelector(".modalcont")
let modal = document.querySelector(".modal");
let selectWarning = document.querySelector(".selectWarning");

// number to currency 

function formatAsIndianRupees(amount) {
    // Format the amount as money in Indian Rupees (INR)
    const formattedMoney = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  
    return formattedMoney;
  }

// to find is numeric
const isNumeric = (value) => {
    return /^-?\d+(\.\d+)?$/.test(value);
  }
const calculate = (a,b,c,d) => {
    
    const totalWithoutTex = Number(a) + Number(b) - Number(d)
    if(totalWithoutTex <= 800000){
        modal.querySelector("h2").innerText = `${formatAsIndianRupees(totalWithoutTex)}`
        modal.querySelector("p").innerText = `Without tax deduction`
        modalCont.style.display = "grid";
    } else{
        if(c === "below40"){
            let taxAmount = .3*(totalWithoutTex - 800000)
            let overall = totalWithoutTex - taxAmount
            modal.querySelector("h2").innerText = `${formatAsIndianRupees(overall)}`
            modal.querySelector("p").innerText = `after tax deduction`
            modalCont.style.display = "grid";
        } else if(c === "40to60"){
            let taxAmount = .4*(totalWithoutTex - 800000)
            let overall = totalWithoutTex - taxAmount
            modal.querySelector("h2").innerText = `${formatAsIndianRupees(overall)}`
            modal.querySelector("p").innerText = `after tax deduction`
            modalCont.style.display = "grid";
        }else if(c === "over60"){
            let taxAmount = .1*(totalWithoutTex - 800000)
            let overall = totalWithoutTex - taxAmount
            modal.querySelector("h2").innerText = `${formatAsIndianRupees(overall)}`
            modal.querySelector("p").innerText = `after tax deduction.`
            modalCont.style.display = "grid";
        }
    }
    return totalWithoutTex
}
  
const handleInputChange = (inputField, icon) => {
    let inputValue = inputField.value.trim();
        if (!isNumeric(inputValue)) {
            icon.style.display = "flex";
            icon.style.justifyContent = "center";
            icon.style.alingItem = "center";
          } else {
            icon.style.display = "none";
          }
  }

  let closeBtn = document.querySelector(".close").addEventListener("click", () => {
    modalCont.style.display = "none"
  })


  document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm();
  });

//   form validation
  function validateForm() {
    let inputFields = document.querySelectorAll('input[type="text"]');
    inputFields.forEach(function(inputField) {
      let icon = inputField.parentElement.querySelector('.icon');
        handleInputChange(inputField, icon);
        let firstField = document.getElementById("firstField").value;
        let secondField = document.getElementById("secondField").value;
        let thirdField = document.getElementById("selectField").value;
        let fourthField = document.getElementById("fourthField").value;
        if(thirdField === ""){
            selectWarning.style.display = "block"
        }else{
            selectWarning.style.display = "none"
        }
  

        
        if (isNumeric(firstField) && isNumeric(secondField) && thirdField !== "" && isNumeric(fourthField)) {
            const result = calculate(firstField,secondField,thirdField,fourthField);
            console.log(result)
            
        }
    });



  }