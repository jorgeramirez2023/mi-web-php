////////////////////////////////////////////////////////
// Frequently Bought Together
////////////////////////////////////////////////////////
document.querySelectorAll('h2').forEach(h2 => {
  if (h2.textContent.trim() === 'Frequently Bought Together') {
    h2.textContent = 'Customizations';
  }
});

////////////////////////////////////////////////////////
// In-Store value by Default
////////////////////////////////////////////////////////
if (window.location.pathname === '/orders/confirm_order') {  
document.addEventListener("DOMContentLoaded", () => {
  

    // Dates with Moment.js
    const cDate = moment().add(20, 'weeks');
    const cDateMMDoYYYY = cDate.format('MMM Do, YYYY'); // Example: "Feb 21st, 2024"
    const cDateMMDDYY = cDate.format('MM/DD/YY');

    // Set the date in the input field with the specific name
    const inputField = document.querySelector('input[name="order[extra_fields][In-Store]"]');
    if (inputField) {
      inputField.value = cDateMMDDYY;

      // Add a notice
      const span = document.createElement("span");
      span.style.fontSize = "smaller";
      span.innerHTML = `The default delivery date is set to 20 weeks onwards<b>(from ${cDateMMDoYYYY})</b>. If you need it sooner, please add <a href="/products/list?category=73" style="color:blue; text-decoration: underline">rush service</a> for each product.`;
      inputField.insertAdjacentElement("afterend", span);
    }
  });    
}

////////////////////////////////////////////////////////////////////
// Hide Gross Total, Sales Tax, and Shipping Cost from Summary
////////////////////////////////////////////////////////////////////
if (window.location.pathname === '/orders/current_order') {
document.addEventListener("DOMContentLoaded", () => {
  
    // Remove div elements containing specific text in their spans
    document.querySelectorAll('div.totals-item').forEach(div => {
      const spanText = div.querySelector('span')?.textContent || '';
      if (spanText.includes("Gross total") || spanText.includes("Sales Tax") || spanText.includes("Shipping costs")) {
        div.remove();
      }
    });
  });    
}

///////////////////////////////////////////////////////////////
function loopURL() {
    clave = "loop";
    const params = new URLSearchParams(window.location.search);
    const valorActual = parseInt(params.get(clave) || "0", 10);

    if (valorActual === 3) {
        console.log("El contador ya llegó a 3. No se recarga.");
        return; // Detiene la función
    } 
    const nuevoValor = valorActual + 1;
    params.set(clave, nuevoValor); 
    const nuevaQueryString = params.toString();
    window.location.href = window.location.pathname + "?" + nuevaQueryString;
}

////////////////////////////////////////////////////////
// Shipping Cost
////////////////////////////////////////////////////////
if (window.location.pathname === '/orders/confirm_order') {
document.addEventListener("DOMContentLoaded", () => { 

    // Get the order ID from the form
    const form = document.querySelector('#confirm-order-form-submit-button')?.closest('form');
    if (!form) {
      console.error("Form not found.");
      return;
    }
    const formId = form.getAttribute('id');
    const idParts = formId.split('_');
    const b2b_soID = idParts[idParts.length - 1];

    // Set cursor to "wait"
    document.body.style.cursor = 'wait';

    // Perform the AJAX request using fetch
    fetch(`https://mi-web-php-ddov.vercel.app/api/layer.php?process=b2b_calc_shippingFee&b2b_order_id=${b2b_soID}&mode=production`, {
      method: 'GET',
    })
    .then(layerReply => layerReply.json())
    .then(layerBody => {
      // Reset cursor to "default"
      document.body.style.cursor = 'default';

      if (layerBody.success == false) {
        Swal.fire({
          icon: "warning",
          html: 'The shipping cost will be provided later. You can continue completing the order in the meantime.'
        });

      } else {
          // Get the shipping cost cell <td>$5.00</td>
          //const shippingCostCell = Array.from(document.querySelectorAll('th')).find(th => th.textContent.includes("Shipping costs"))?.nextElementSibling;
          const shippingCostCell = [...document.querySelectorAll('th')].find(th => th.textContent.trim() === "Shipping costs")?.closest("tr")?.querySelector("td");

          if (shippingCostCell) {
            console.error('FOUND Shipping Cost label');
            // FOR EDITING ORDERS; OR ALSO...
            // ...WHEN YOU GO BACK FROM CHECKOUT PAGE TO SUMMARY PAGE AND THEN GET BACK AGAIN TO CHECKOUT PAGE
            const currentShippingCost = shippingCostCell.textContent.trim();
            const currentShippingCostNumber = parseFloat(currentShippingCost.replace('$', ''));
            //
            if (currentShippingCostNumber !== layerBody.shipping_cost) {
              console.error(currentShippingCostNumber + ' vs ' + layerBody.shipping_cost);
              //location.reload();
              loopURL();
            }
          } else {
            // GENERALLY FOR NEW ORDERS, OR FIRST TIME YOU VISIT THE CHECKOUT PAGE
            // If not found, RELOAD, because the shipping_cost php method has created the Shipping Field in the order
            // and it will appear when page is refreshed
            console.error('NOT FOUND Shipping Cost label');
            //location.reload();
            loopURL();
          }
      }
    })
    .catch(error => {
      console.error('Error in the fetch request:', error);
    });
  });
}


// BASE MODEL JAVASCRIPT: Filter page, Document Ready, Listener on Submit Button in ASYNC + Capture time, call API, Continue or PreventDefault
/*
if (window.location.href.indexOf('orders/confirm_order') >=0) {
  document.addEventListener("DOMContentLoaded", () => {    

    // Click on the button
    document.addEventListener('click', async function (event) {
      if (event.target && event.target.id === 'confirm-order-form-submit-button') 
      {          
          console.log('Validation runs!!!!');
          if ( confirm("Press OK for validation success, or Cancel to show an error message!") ) {          
            alert('Validation success');                        
          } else {
            // show error messages
            alert("The order has errors");          
            // prevent the order submission
            event.preventDefault();
          }                 
      }
    }, true);
  });
};
*/

////////////////////////////////////////////////////////
// Rush Item
////////////////////////////////////////////////////////

if (window.location.href.indexOf('orders/confirm_order') >=0) {
    document.addEventListener("DOMContentLoaded", () => {    

      // Variables      
      const submitButtonID = '#confirm-order-form-submit-button'
      const submitButton = document.querySelector(submitButtonID);

      // Click on the button      
      document.addEventListener('click', async function (event) {                
        if (event.target === submitButton) 
        {          
              event.preventDefault();
              //
              console.log("callRushItemAPI");
              const form = submitButton.closest('form');
              const formId = form.getAttribute('id');
              const idParts = formId.split('_');
              const b2b_soID = idParts[idParts.length - 1];
              const inStoreField = document.querySelector('#order_extra_fields_In-Store');
              const inStore = inStoreField ? inStoreField.value : null;
              console.log("b2b_soID: " + b2b_soID);
              console.log("inStore: " + inStore);

              // Set cursor to "wait"
              document.body.style.cursor = 'wait';
              await fetch(`https://mi-web-php-ddov.vercel.app/api/layer.php?process=b2b_validate_rushItem&b2b_order_id=${b2b_soID}&in_store=${inStore}`, {
                  method: 'GET'
              })
              .then(layerReply => layerReply.json())
              .then(layerBody => {                  
                console.log(layerBody);
                document.body.style.cursor = 'default';
                  if (layerBody.success === false) {
                      // Proceed with Saving
                      $(submitButtonID).submit();
                      // NOTIFY the admin user he needs to make the verification manually
                  }
                  else {

                    if (layerBody.code === 'rush') {
                        Swal.fire({
                            title: 'Quick delivery alert!',
                            html: layerBody.description,
                            showDenyButton: true,
                            confirmButtonText: 'Yes, show options',
                            denyButtonText: 'No, proceed anyway',
                            icon: "warning"
                        }).then((result) => {
                            if (result.isConfirmed) {                
                              // No saving
                              event.stopImmediatePropagation();
                              window.location.href = '/products/list?category=73'; // Yes, show options                                          
                              return;
                            }        
                            else {
                              // Proceed with Saving
                              $(submitButtonID).submit();
                              return;
                              // NOTIFY the admin user to apply charges later!
                            }                   
                        });                    
                    }                                
                    else if  (layerBody.code == 'done') {
                        // The user selected the rush items.
                        // Proceed with saving, without any notification
                        $(submitButtonID).submit();
                        return;
                    }
                    else if (layerBody.code == 'no_rush') {
                        // More than 20 weeks.
                        // Proceed with saving, without any notification
                        $(submitButtonID).submit();
                        return;
                    }
  
                  }            
              }).catch(error => {
                  console.error('Error in the fetch request:', error);
                  // Proceed with Saving
                  $(submitButtonID).submit();                  
                  return;
                  // NOTIFY the admin user he needs to make the verification manually
                  
              });
  
        }
      }, true);

    });
};

/////////////////////////////////////////////////////////////
// Remove unused customizations
/////////////////////////////////////////////////////////////
if (window.location.pathname === '/orders/current_order' || window.location.pathname.startsWith('/orders/view')) {

  document.addEventListener("DOMContentLoaded", () => {

    function getOrderNotes(remainingContent) {
      // Regular expression to match <div class="order-product-note-text">...</div>
      const regex = /<div class="order-product-note-text">([^<]*)<\/div>/g;
      const list = [];
      let match;

      // Extract matches from the remaining content
      while ((match = regex.exec(remainingContent)) !== null) {
        const noteText = match[1].trim();

        // Ignore empty notes
        if (noteText !== '') {
          list.push(noteText);
        }
      }

      return list;
    }

    function getOrderNotesFormat(result) {
      if (!Array.isArray(result) || result.length === 0) {
        return ''; // Return empty if result is not valid
      }
    
      return `
        <ul style="list-style:none; padding:0; margin:0;">
          ${result.map(note => `<li><strong>${note}</strong></li>`).join('')}
        </ul>
      `;
    }

    function getOrderItemOptions(detailsText) {
      let list = [];
      if (!detailsText) {
        return;
      }

      // Create a temporary element to parse HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = detailsText;

      // Remove the first <a> tag and any <br> tag following it
      const firstLink = tempDiv.querySelector('a');
      let removedLinkHtml = '';
      if (firstLink) {
        removedLinkHtml = firstLink.outerHTML;
        firstLink.remove();
        const nextBr = tempDiv.querySelector('br');
        if (nextBr) {
          nextBr.remove();
        }
      }

      // Extract remaining HTML content
      const remainingContent = tempDiv.innerHTML;

      // Regular expression for "name: value" pairs
      const regex = /<span class="option-name">([^:<]+):?\s*<\/span>\s*<span class="option-value">([^<]*)<\/span>/g;

      let match;

      // Extract matches from the remaining content
      while ((match = regex.exec(remainingContent)) !== null) {
        const attributeName = match[1].trim();
        const attributeValue = match[2].trim();

        // Ignore empty customizations
        if (attributeValue !== '') {
          list.push({ [attributeName]: attributeValue });
        }
      }

      // Regular expression for additional details
      const extraRegex = /Details for ([^:]+):\s*([^<]*)/g;
      while ((match = extraRegex.exec(remainingContent)) !== null) {
        const detailName = match[1].trim();
        const detailValue = match[2].trim();

        // Ignore empty details
        if (detailValue !== '') {
          list.push({ [`Details for ${detailName}`]: detailValue });
        }
      }

      console.log("###### BEFORE SORTING ######");
      console.log(JSON.stringify(list, null, 2));

      ///////////////////////////////////////////////////
      // Array Sorting
      //////////////////////////////////////////////////////

      const result = [];

      // Iterate over the list and match "Details for" items
      list.forEach(item => {
        const key = Object.keys(item)[0];
        if (key.startsWith('Details for')) {
          const baseKey = key.replace('Details for', '').trim();
          // Find and add the detail next to its corresponding item
          result.forEach((resItem, index) => {
            if (resItem.hasOwnProperty(baseKey)) {
              result.splice(index + 1, 0, item);
            }
          });
        } else {
          result.push(item);
        }
      });

      console.log("###### AFTER SORTING ######");
      console.log(JSON.stringify(result, null, 2));

      return { result, removedLinkHtml };
    }

    function getOrderItemOptionsFormat(result) {
      // Rebuild the text using bullets
      let formattedDetails =
        '<ul style="list-style:disc;list-style-position: inside;">';

      result.forEach(item => {
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            formattedDetails += `<li>${key}: ${item[key]}</li>`;
          }
        }
      });

      formattedDetails += '</ul>';
      return formattedDetails;
    }

    // Process table with class "current-products"
    const table = document.querySelector('.current-products');

    if (table) {
      // Get all rows from tbody
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const productTitleCell = row.querySelector('td.product-title');

        if (productTitleCell) {
          // Extract and format product details
          const output = getOrderItemOptions(productTitleCell.innerHTML);
          const formattedText = getOrderItemOptionsFormat(output.result);
          console.log("formated Customizations: " + formattedText);
          // Extract and format notes
          const outpupt_notes = getOrderNotes(productTitleCell.innerHTML);
          const formatted_notes = getOrderNotesFormat(outpupt_notes);
          console.log("formated Notes: " + formatted_notes);

          productTitleCell.innerHTML = output.removedLinkHtml + (formattedText ? '<br>' + formattedText : '') + (formatted_notes ? '<br>' + formatted_notes : '');
        }
      });
    }
  });  
}


/////////////////////////////////////////////////////////////
// Add "Balance due" amount on /orders/confirm_order_success
/////////////////////////////////////////////////////////////
if (window.location.pathname === '/orders/confirm_order_success') {
  document.addEventListener("DOMContentLoaded", () => {  
    // Helper function to parse numbers with "," as thousand and "." as decimal
    function parseNumber(value) {
      let cleanedValue = value.replace(/\$/g, '').trim(); // Remove dollar signs and spaces
      cleanedValue = cleanedValue.replace(/,/g, ''); // Remove thousand separators
      return parseFloat(cleanedValue);
    }

    // Helper function to format numbers with commas and a period for decimals
    function formatNumber(value) {
      return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Extract and parse amounts
    const paidAmountText = document.querySelector('.total-paid-amount > .text-left')?.textContent || '';
    const totalText = document.querySelector('.total > .text-left')?.textContent || '';
    const paidAmount = parseNumber(paidAmountText);
    const total = parseNumber(totalText);

    // Check if parsed values are valid and insert only if not already present
    if (!isNaN(paidAmount) && !isNaN(total) && total > paidAmount) {
      const due = total - paidAmount;
      const formattedDue = formatNumber(due);

      // Ensure no duplicate rows by checking for an existing row with a unique ID or class
      if (!document.querySelector('.balance-due')) {
        // Create new row with balance due
        const newRow = document.createElement('tr');
        newRow.className = 'total balance-due';
        newRow.style.backgroundColor = 'rgb(210, 210, 210)';
        newRow.innerHTML = `
          <th>Balance due</th>
          <td class="text-left">$${formattedDue}</td>
        `;

        // Insert the new row after the last "total" row
        const lastTotalRow = document.querySelector('.total:last-of-type');
        if (lastTotalRow) {
          lastTotalRow.parentNode.insertBefore(newRow, lastTotalRow.nextSibling);
        }
      }
    }
  });
}


/////////////////////////////////////////////////////////////
// Trunk Show Promo Code instead of Discount CODE
/////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {  
  // Select the label associated with the "coupon_code" input field
  const label = document.querySelector('label[for="coupon_code"]');

  // Ensure the label exists and has child nodes
  if (label) {
    // Loop through the child nodes to find and replace the text node
    for (const childNode of label.childNodes) {
      if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "Discount Code") {
        childNode.nodeValue = "Trunk Show Promo Code"; // Replace the text
        break; // Exit loop once text is updated
      }
    }
  }
});

////////////////////////////////////////////////////
// Shop by Category instead of Shop by Brand
////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {  
  // Find all <a> elements with the exact text "Shop by Brand"
  const elementsWithText = [...document.querySelectorAll("a")].filter(
    element => element.textContent.trim() === "Shop by Brand"
  );

  // Update the text content for each matched element
  elementsWithText.forEach(element => {
    element.textContent = "Shop by Category";
  });
});

////////////////////////////////////////////////////////////
// Customization boxes in Product Details:  MODAL
////////////////////////////////////////////////////////////
if (
  window.location.pathname.startsWith('/products/list') || 
  window.location.pathname.startsWith('/products/search_list')
) {
  document.addEventListener("DOMContentLoaded", () => {    
      const targetElement = document.getElementById("ajaxSaveModal");

      if (targetElement) {
        const observer = new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            if (mutation.attributeName === "class") {
              const currentClasses = targetElement.className;

              if ( currentClasses.includes("modal") &&  currentClasses.includes("fade") &&  currentClasses.includes("show") ) {

                //////////////////////////////////////////////////
                // Process placeholder customizations
                //////////////////////////////////////////////////
                targetElement.querySelectorAll('.select-option[placeholder*="customizations" i]:not([placeholder^="details for" i])').forEach(option => {                    
                    const cusGroupName = option.getAttribute('placeholder');
                    const table = targetElement.querySelector('#single-product-quantities');

                    if (table) {
                      table.querySelectorAll('input[placeholder="details for ' + cusGroupName + '" i]').forEach(element => {
                          element.closest('.row').style.display = 'none';
                          console.log("Element Disabled: " + element.getAttribute('placeholder'));
                      });
                    }                                        

                    // 
                    option.addEventListener('change', function() {
                        // Show the "Details for..."
                        table.querySelectorAll('input[placeholder="details for ' + cusGroupName + '" i]').forEach(element => {
                          element.closest('.row').style.display = '';
                          element.closest('.row').style.backgroundColor = 'rgb(230, 230, 230)';
                          console.log("Element ENABLED: " + element.getAttribute('placeholder'));
                        });
  

                        // if "Special Request" is selected, send an Alert
                        const selectedText = this.options[this.selectedIndex].text.toLowerCase();
                        console.log("selectedtext: " + selectedText);
                        if (selectedText.includes("special request")) {
                            Swal.fire({
                              title: 'Information',
                              html: "Special Request options require a custom quote. Please provide all details.",
                            });
                        }                    
                    });

                });

                //////////////////////////////////////////////////
                // Process placeholder size
                //////////////////////////////////////////////////
                targetElement.querySelectorAll('.select-option[placeholder="Size"]').forEach(option => {
                    option.addEventListener('change', function() {
                      sizeText = this.options[this.selectedIndex].text
                      console.log("sizeText: " + sizeText);
                      if (sizeText == "Custom") {
                        console.log("It's Custom");
                        const sizeCustomizations = document.getElementById('option_61');
                        const splitSizeOption = Array.from(sizeCustomizations.options).find((option) => option.text.startsWith('Split Size'));
                        if (splitSizeOption) {
                            sizeCustomizations.value = splitSizeOption.value;
                            siblingRow = sizeCustomizations.closest('.row').nextElementSibling;
                            if (siblingRow) {
                              siblingRow.style.display = '';
                              siblingRow.style.backgroundColor = 'rgb(230, 230, 230)';
                            }
        
                        } 
                        Swal.fire({
                          title: 'Information',
                          html: "Selecting the [Custom] option requires specifying a 'Split Size' in the 'Size Customizations' section. Please provide all necessary details.",
                        });

                      }
                    });
                });                

                //
              }
            }
          });
        });

        observer.observe(targetElement, { attributes: true });
      }
  });
}


////////////////////////////////////////////////////////////////////////////////
// Customization boxes in Product Details standard view: NO MODAL
////////////////////////////////////////////////////////////////////////////////
if (window.location.pathname.startsWith('/products/view/')) {
  document.addEventListener("DOMContentLoaded", () => {      

    const carouselProductDiv = document.querySelector('#carouselProduct');
    const nuevoEnlace = document.createElement('a');
    nuevoEnlace.href = 'https://kellyfaetanini.b2bwave.com/pages/13-customization-helpers';
    nuevoEnlace.textContent = 'View Popular Customizations';
    nuevoEnlace.style.color = 'blue'; // Pone el texto de color azul
    nuevoEnlace.style.textDecoration = 'underline'; // Añade el subrayado
    nuevoEnlace.style.cursor = 'pointer'; // Opcional: asegura que el cursor sea una manito    
    if (carouselProductDiv) {
        carouselProductDiv.appendChild(nuevoEnlace);
    }
    /**/
    const targetElement = document.getElementById("single-product-info");

    if (targetElement) {
      targetElement.querySelectorAll('.select-option[placeholder*="customizations" i]:not([placeholder^="details for" i])').forEach(option => {
          const cusGroupName = option.getAttribute('placeholder');
          const table = targetElement.querySelector('#single-product-quantities');

          if (table) {
            table.querySelectorAll('input[placeholder="details for ' + cusGroupName + '" i]').forEach(element => {
                element.closest('.row').style.display = 'none';
                console.log("Element Disabled: " + element.getAttribute('placeholder'));
            });
          }                                        
          /*
          const siblingRow = option.closest('.row')?.nextElementSibling;

          // Initially hide the sibling row
          if (siblingRow) {
            siblingRow.style.display = 'none';
          }
          */
        
          // Add an event listener to make the sibling row visible upon change
          option.addEventListener('change', function () {
              table.querySelectorAll('input[placeholder="details for ' + cusGroupName + '" i]').forEach(element => {
                element.closest('.row').style.display = '';
                element.closest('.row').style.backgroundColor = 'rgb(230, 230, 230)';
                console.log("Element ENABLED: " + element.getAttribute('placeholder'));
              });
              /*
              if (siblingRow) {
                siblingRow.style.display = '';
                siblingRow.style.backgroundColor = 'rgb(230, 230, 230)';
              }
              */
              // Check if the selected option contains "Special Request" (case-insensitive)
              const selectedText = this.options[this.selectedIndex]?.text.toLowerCase() || '';
              if (selectedText.includes("special request")) {
                Swal.fire({
                  title: 'Information',
                  html: "Special Request options require a custom quote. Please provide all details.",
                });
              }
          });


      });
    }
  });
}
