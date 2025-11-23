//////////////////////////////////////////////////////////////
// Version
//////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {

    // Select the <ul> element
    const ulElement = document.querySelector('ul.kt-menu__nav');

    // Create the <div> element
    const newDiv = document.createElement('div');
    newDiv.style.padding = '10%';
    //newDiv.innerHTML = `<span style="color:gray;font-size:normal;"><b>[Last Update: 20-Jan-25 01:17]</b></span>`;
    newDiv.innerHTML= `<a href="https://creatorapp.zohopublic.com/proyectus123/kf-sync/form-perma/Box_Label_for_PO/pFJRDWq0bf2D34h5J23sevaYaSgs8B1wDtum7ZxdRuQrgtFC84SwRMrXyfqVE5aKj0sj4TQ8feTDD8FA5YMMdz2n9XpZUP6e4efy" target="_blank">Box Label for PO's</a>`;

    // Insert the <div> after the <ul>
    if (ulElement && ulElement.parentNode) {
        ulElement.parentNode.insertBefore(newDiv, ulElement.nextSibling);
    }
});

//////////////////////////////////////////////////////////////
/////// Create button for Cin7 sync: ORDERS PAGE
//////////////////////////////////////////////////////////////
if (/^\/orders\/\d+\/edit$/.test(window.location.pathname)) {
    document.addEventListener("DOMContentLoaded", () => {
        
        ////////////////
        current_url = window.location.pathname;
        console.log('url: ' + current_url);
        const match = current_url.match(/\/orders\/(\d+)\/edit/);
        console.log('match: ' + match[1]);
        b2b_order_id = "";
        if (match) {
            b2b_order_id = match[1]; // Extracted number as a string                
        } else {
            console.log("Order ID not found in URL");
        }

        ////////////////
        document.querySelector('a.create-zoho-inventory').style.display = 'none';            
        document.querySelector('a.create-dear-inventory').style.display = 'none';            

        /////////////////////////////////////////////////////////
        // BUTTON: CHARGE REMAINING AMOUNT
        //
        /////////////////////////////////////////////////////////
        if (document.querySelector('a.btn.btn-sm.btn-primary.charge-card')) {
            const buttonRemaining = document.createElement("button");
            buttonRemaining.className = "btn btn-success";
            buttonRemaining.style.backgroundColor = "blue";
            buttonRemaining.style.marginLeft = "5px";
            buttonRemaining.innerHTML  = document.querySelector('a.btn.btn-sm.btn-primary.charge-card').innerHTML;
            document.querySelector('a.btn.btn-sm.btn-primary.charge-card').insertAdjacentElement("afterend", buttonRemaining); 
            //
            buttonRemaining.addEventListener("click", async (event) => {
                event.preventDefault();
                event.stopPropagation(); // Prevent on the parent element only 
                //
                const width = 630, height = 430;
                const left = (screen.width/2) - (width/2);
                const top  = (screen.height/2) - (height/2);
                
                const url = "https://creatorapp.zohopublic.com/proyectus123/kf-sync/form-perma/Order_Amount1/u9qCSErNvSAqDCQdmNCduFR0Dunpxf99zvw2QuwXTyg6BKveO66MkqB4Rrt7bwEJEPxRsy5qhEqR9STkqDAHaSRe2JqkmPff6tUg?b2b_order_id=" + encodeURIComponent(b2b_order_id) + "&remaining_chk=true";
                
                const popup = window.open(
                url,
                "popupWindow",
                `width=${width},height=${height},scrollbars=yes,resizable=yes,top=${top},left=${left}`
                );
                
                // cuando el popup avise “popup-done”, lo cierro
                window.addEventListener("message", (e) => {
                if (e.data === "popup-done" && popup && !popup.closed) popup.close();
                });                                   
            });
            
        }
        /////////////////////////////////////////////////////////
        // BUTTON: PARTIAL AMOUNTS
        //
        /////////////////////////////////////////////////////////
        if (document.querySelector('a.btn.btn-sm.btn-primary.charge-card')) {        
            const buttonPartial = document.createElement("button");
            buttonPartial.className = "btn btn-success";
            buttonPartial.style.backgroundColor = "green";
            buttonPartial.style.marginLeft = "5px";
            buttonPartial.innerHTML  = "<i class='fa fa-credit-card'></i> Charge partial amounts";
            document.querySelector('a.btn.btn-sm.btn-primary.charge-card').insertAdjacentElement("afterend", buttonPartial); 
            document.querySelector('a.btn.btn-sm.btn-primary.charge-card').style.display = 'none';
            //
            buttonPartial.addEventListener("click", async (event) => {
                event.preventDefault();
                event.stopPropagation(); // Prevent on the parent element only 
                //
                const width = 630, height = 430;
                const left = (screen.width/2) - (width/2);
                const top  = (screen.height/2) - (height/2);
                
                const url = "https://creatorapp.zohopublic.com/proyectus123/kf-sync/form-perma/Order_Amount1/u9qCSErNvSAqDCQdmNCduFR0Dunpxf99zvw2QuwXTyg6BKveO66MkqB4Rrt7bwEJEPxRsy5qhEqR9STkqDAHaSRe2JqkmPff6tUg?b2b_order_id=" + encodeURIComponent(b2b_order_id);
                
                const popup = window.open(
                url,
                "popupWindow",
                `width=${width},height=${height},scrollbars=yes,resizable=yes,top=${top},left=${left}`
                );
                
                // cuando el popup avise “popup-done”, lo cierro
                window.addEventListener("message", (e) => {
                if (e.data === "popup-done" && popup && !popup.closed) popup.close();
                });                                   
            });
        }
        /////////////////////////////////////////////////////////
        // BUTTON: Push to Cin7
        //
        /////////////////////////////////////////////////////////
        const button = document.createElement("button");
        button.className = "btn btn-success btn-stay";
        button.style.backgroundColor = "red";
        button.style.marginLeft = "100px";
        button.textContent = "Push Order " + b2b_order_id + " to Cin7";
        button.id="push_to_cin7";

        document.querySelector('input[id="save_stay_button"]').insertAdjacentElement("afterend", button);
        
        button.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation(); // Prevent on the parent element only 
            //
            const width = 800, height = 500;
            const left = (screen.width/2) - (width/2);
            const top  = (screen.height/2) - (height/2);
            
            const url = "https://creatorapp.zohopublic.com/proyectus123/kf-sync/form-perma/Push_Order/q4UeSr0UKY4zav5jQ6ZQNZA2pva9Wna7G5E6hFegzsv9JGWezrvkusrkERjWyn582kvqvtu6K8BKYmAOyOQyaeEvfJOdYdhMwsSk?b2b_order_id=" + encodeURIComponent(b2b_order_id);
            
            const popup = window.open(
            url,
            "popupWindow",
            `width=${width},height=${height},scrollbars=yes,resizable=yes,top=${top},left=${left}`
            );
            
            // cuando el popup avise “popup-done”, lo cierro
            window.addEventListener("message", (e) => {
            if (e.data === "popup-done" && popup && !popup.closed) popup.close();
            });                                   
        
        });                

        /////////////////////////////////////////////////////////
        // HTML: Cin7 Order List
        //
        /////////////////////////////////////////////////////////
        cin7_order_html = "";
        document.body.style.cursor = 'wait';
        fetch(`https://mi-web-php-ddov.vercel.app/api/layer.php?process=b2b_get_cin7_orders_links&b2b_order_id=` + encodeURIComponent(b2b_order_id), {
            method: 'GET'
        })
        .then(layerReply => layerReply.json())
        .then(layerBody => {                              
            console.log('layerBody:',layerBody);
            document.body.style.cursor = 'default';                
            // {
            //      "success" : true, 
            //      "html":"<a href='https:\/\/inventory.dearsystems.com\/Sale#e2f98c3c-a501-4738-8136-f26d3f30f672' target='_blank'>SO-00321<\/a>"
            //  }
            //            
            if (layerBody.success === true) {
                cin7_order_html = layerBody.html;                
                console.log('layerBody.html:',layerBody.html);
                //
                const span_cin7OrderHTML = document.createElement("span");                
                span_cin7OrderHTML.style.padding = "20px";
                span_cin7OrderHTML.style.backgroundColor = "rgb(230,230,230)";
                span_cin7OrderHTML.style.fontSize = "larger"
                span_cin7OrderHTML.id="span_cin7OrderHTML";
                console.log('cin7_order_html: ', cin7_order_html);
                if (cin7_order_html == "") {
                    span_cin7OrderHTML.innerHTML = "<b>Cin7 Orders:</b>&nbsp;&nbsp;No matching orders found";    
                }
                else {
                    span_cin7OrderHTML.innerHTML = "<b>Cin7 Orders:</b>&nbsp;&nbsp;" + cin7_order_html;
                }                
                //
                document.querySelector('#push_to_cin7').insertAdjacentElement("afterend", span_cin7OrderHTML);
                //
            }
            else {
                console.error('Error in the fetch request: ' + json_encode(layerBody));
            }                                
        }).catch(error => {
            console.error('Error in the fetch request:', error);
        });
        //
        /////////////////////////////////////////////////////////
        // View Shipping Calc
        //
        /////////////////////////////////////////////////////////
        const productList = document.getElementById("product-list");
        const allStrongElements = productList.querySelectorAll("strong");
        const shippingLabel = Array.from(allStrongElements).find(el => el.textContent.includes('Shipping costs'));
        //        
        if (shippingLabel) {
            console.log("Found it:", shippingLabel);
            const newLink = document.createElement('a');
            //
            newLink.href = '#'; 
            newLink.textContent = 'View Shipping Calc';
            // --- Add CSS using the .style property ---
            newLink.style.color = 'white';
            newLink.style.fontWeight = 'normal';
            newLink.style.textDecoration = 'none'; // Removes the underline
            newLink.style.backgroundColor = '#007bff'; // A nice blue color
            newLink.style.padding = '10px 15px';
            newLink.style.border = 'none';
            newLink.style.borderRadius = '5px';
            newLink.style.marginRight = '15px';
            newLink.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            //
            newLink.addEventListener('click', function(event) {            
                event.preventDefault();
                //
                const urlParaPopup = 'https://creatorapp.zohopublic.com/proyectus123/kf-sync/page-perma/Portal_View_Shipping_Calc/bxTKy1AHdebmBNm1J5JOhW6eqzP4GKrtHXCvaCpsVaS1qdDSHmEjqsmCOWS5Z78bv0ADJBUKS1Ba6ydEGmW33ZnO14gSV25tk8ZE?b2b_order_id=' + encodeURIComponent(b2b_order_id) + "&portal=true"; // <-- CAMBIA ESTA URL POR LA QUE NECESITES
                const nombrePopup = 'popupWindow';
                const width = 800, height = 600;
                const left = (screen.width/2) - (width/2);
                const top  = (screen.height/2) - (height/2);
                const caracteristicas = `width=${width},height=${height},scrollbars=yes,resizable=yes,top=${top},left=${left}`;                            
                //
                window.open(urlParaPopup, nombrePopup, caracteristicas);
            });
            //
            shippingLabel.before(newLink);        
        } else {
        console.log("Element containing 'Shipping costs' was not found.");
        }        
        /////////////////////////////////////////////////////////
        // View AuthNet Transactions
        //
        /////////////////////////////////////////////////////////
        console.log(" View AuthNet Transactions.");
        const bodyAllStrongElements = document.querySelectorAll('table.table strong');
        const paymentOptionLabel = Array.from(bodyAllStrongElements).find(el => 
        el.textContent.includes('Payment option')
        );//        
        if (paymentOptionLabel) {
            console.log("Found it:", paymentOptionLabel);
            const newLinkVT = document.createElement('a');
            //
            newLinkVT.href = '#'; 
            newLinkVT.textContent = 'View Payments in Auth.Net';
            newLinkVT.className = "btn btn-success";
            newLinkVT.style.backgroundColor = "orange";
            newLinkVT.style.marginLeft = "5px";
            // --- Add CSS using the .style property ---
            //newLinkVT.style.color = 'white';
            //newLinkVT.style.fontWeight = 'normal';
            //newLinkVT.style.textDecoration = 'none'; // Removes the underline
            //newLinkVT.style.backgroundColor = '#007bff'; // A nice blue color
            //newLink.style.padding = '10px 15px';
            //newLink.style.border = 'none';
            //newLink.style.borderRadius = '5px';
            //newLinkVT.style.marginRight = '15px';
            //newLink.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            //
            newLinkVT.addEventListener('click', function(event) {            
                event.preventDefault();
                //
                const urlParaPopup = 'https://creatorapp.zohopublic.com/proyectus123/kf-sync/page-perma/GetTransactionsOrder/kd5BxhuZNYXbn8O38YJZM2K7ERNx2OMZEpOqXSSCgUByzvhBNpvKtjEVRdb5sY5f6uMUjWTMPX5GkEOy5OhYyB3OWWBFNJdZOnvr?b2b_order_id=' + encodeURIComponent(b2b_order_id) + "&portal=true"; // <-- CAMBIA ESTA URL POR LA QUE NECESITES
                const nombrePopup = 'popupWindow';
                const width = 1000, height = 500;
                const left = (screen.width/2) - (width/2);
                const top  = (screen.height/2) - (height/2);
                const caracteristicas = `width=${width},height=${height},scrollbars=yes,resizable=yes,top=${top},left=${left}`;                            
                //
                window.open(urlParaPopup, nombrePopup, caracteristicas);
            });
            //
            const br = document.createElement('br');
            paymentOptionLabel.after(br, newLinkVT);            
        } else {
        console.log("Element containing 'Shipping costs' was not found.");
        }                


    });
}
  

//////////////////////////////////////////////////////////////
/////// Format customization variants on ORDERS
//////////////////////////////////////////////////////////////
if (/^\/orders\/\d+\/edit$/.test(window.location.pathname)) {
  document.addEventListener("DOMContentLoaded", () => {

      function adm_parseProductDetails(html) {
          // Original logic remains unchanged
          let list = [];
          let tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;

          const firstLink = tempDiv.querySelector('a');
          let removedLinkHtml = '';
          if (firstLink) {
              removedLinkHtml = firstLink.outerHTML;
              firstLink.remove();
          }

          const optionElements = tempDiv.querySelectorAll('.option-name');
          optionElements.forEach(option => {
              let optionText = option.textContent.trim();
              const [attributeName, ...attributeValue] = optionText.split(':');
              const additionalValue = option.nextElementSibling?.querySelector('i, .order-product-option-value')?.textContent?.trim() || '';
              const finalValue = (attributeValue.join(':').trim() || additionalValue).trim();
              if (attributeName) {
                  list.push({ [attributeName]: finalValue });
              }
          });

          const filteredOptions = list.filter(item => {
              const key = Object.keys(item)[0];
              return item[key] !== ''; // Remove items with empty values
          });

          return {
              removedLinkHtml,
              options: filteredOptions
          };
      }

      function adm_formattedProductDetails(result) {
          // Original logic remains unchanged
          if (!Array.isArray(result)) {
              console.error("Expected an array, got:", result);
              return "<ul><li>Error: Invalid data</li></ul>";
          }
          let formattedDetails = '<ul style="list-style:disc;list-style-position: inside;">';
          result.forEach(item => {
              for (let key in item) {
                  if (item.hasOwnProperty(key)) {
                      formattedDetails += `<li>${key}: ${item[key]}</li>`;
                  }
              }
          });
          formattedDetails += "</ul>";
          return formattedDetails;
      }

      function processTableRows() {
          const table = document.querySelector('#product-list');
          if (table) {
              console.log("Table found");
              const rows = table.querySelectorAll('tbody tr');
              rows.forEach(row => {
                  console.log("Processing row");
                  const pNameCells = row.querySelectorAll('td.p-name');
                  if (pNameCells.length > 1) {
                      const productTitleCell = pNameCells[1];
                      console.log("Processing cell:", productTitleCell.innerHTML);

                      const hasKeyValueStructure = productTitleCell.querySelector('.option-name');
                      if (hasKeyValueStructure) {
                          console.log("Key-Value Structure Detected");
                          const parsedDetails = adm_parseProductDetails(productTitleCell.innerHTML);
                          console.log("Parsed Details:", parsedDetails);

                          if (Array.isArray(parsedDetails.options)) {
                              const formattedDetails = adm_formattedProductDetails(parsedDetails.options);
                              console.log("Formatted Details:", formattedDetails);
                              productTitleCell.innerHTML = formattedDetails;
                          } else {
                              console.error("Error: Parsed details do not contain a valid 'options' array.");
                          }
                      } else {
                          console.log("Skipping Cell: No Key-Value Structure Found");
                      }
                  }
              });
          }
      }

      // Initialize processing
      processTableRows();

  });
}


////////////////////////////////////////////////////////
// Button "Push to Cin7" **********************************************
////////////////////////////////////////////////////////

if (window.location.pathname.startsWith('/products/') && window.location.pathname.endsWith('/edit')) {
  document.addEventListener("DOMContentLoaded", () => {
      // Push to Cin7
      async function pushToCin7(main_sku, userInput) {
          const confirmation = await Swal.fire({
              title: 'Confirmation',
              html: `The system will push [${userInput}] to Cin7. Are you sure you want to proceed?`,
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, proceed"
          });

          if (confirmation.isConfirmed) {
              console.log(`main_sku: ${main_sku}, userInput: ${userInput}`);
              // Construct the API URL
              const getURL = `https://mi-web-php-ddov.vercel.app/api/layer.php?process=sync_product&op_pro_main_code=${main_sku}&op_pro_variant_code=${userInput}`;
              //const getURL = `sync_Product.php?main_sku=${main_sku}&product_sku=${userInput}`;

              try {
                  // Make the GET request
                  const response = await fetch(getURL);

                  if (response.ok) {
                      await Swal.fire({
                          title: "Done!",
                          text: `The product ${userInput} has been pushed to Cin7 successfully`,
                          icon: "success"
                      });
                  } else {
                      throw new Error("Request failed");
                  }
              } catch (error) {
                  await Swal.fire({
                      title: "Error!",
                      text: `There was an error pushing the product ${userInput} to Cin7`,
                      icon: "error"
                  });
              }
          }
      }

      // Get main SKU value
      const mainSkuInput = document.querySelector('input[name="product[part_number]"]');
      const main_sku = mainSkuInput ? mainSkuInput.value : null;

      // Add "Push to Cin7" buttons for Variants
      document.querySelectorAll('.table.variants a.btn[href^="#modal_"]').forEach(anchor => {
          const textInput = anchor.closest('tr').querySelector('input[type="text"]');
          const textboxValue = textInput ? textInput.value : null;

          if (main_sku && textboxValue) {
              const button = document.createElement("button");
              button.className = "btn btn-sm btn-primary";
              button.style.backgroundColor = "green";
              button.style.marginLeft = "5px";
              button.textContent = "Push to Cin7";

              anchor.insertAdjacentElement("afterend", button);

              button.addEventListener("click", async (event) => {
                  document.body.style.cursor = 'wait';    
                  event.preventDefault();
                  event.stopPropagation(); // Prevent on the paret element only 
                  await pushToCin7(main_sku, textboxValue);
                  document.body.style.cursor = 'default';
              });
          }
      });

      // Add "Push to Cin7" button for the Main Product
      const mainButton = document.createElement("button");
      mainButton.className = "btn btn-sm btn-primary";
      mainButton.style.backgroundColor = "green";
      mainButton.style.marginLeft = "5px";
      mainButton.textContent = "Push to Cin7";

      if (mainSkuInput) {
          mainSkuInput.insertAdjacentElement("afterend", mainButton);

          mainButton.addEventListener("click", async (event) => {
              document.body.style.cursor = 'wait';
              event.preventDefault();
              event.stopPropagation(); // Prevent on the paret element only 
              await pushToCin7(main_sku, main_sku);
              document.body.style.cursor = 'default';
          });
      }
  });
}

////////////////////////////////////////////////////////
// FOB Supplier AND FOB Price **********************************************
////////////////////////////////////////////////////////

if (window.location.pathname.startsWith('/products/')) {
  document.addEventListener("DOMContentLoaded", async () => {
      async function fetchSuppliers() {
          try {
              // Construct the URL with query parameters
              const url = new URL('https://mi-web-php-ddov.vercel.app/api/layer.php?process=cin7_getSuppliersForB2B');
              // Fetch the data
              const response = await fetch(url.toString(), {
                  method: 'GET',
              });

              // Check if the response is successful
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }

              // Parse and return JSON data
              return await response.json();
          } catch (error) {
              console.error('Error in fetchSuppliers:', error.message);
              return [];
          }
      }

      // Fetch and populate suppliers
      const result = await fetchSuppliers();
      if (result.success) {
            const suppliers = result.data;      

            const selectID = document.querySelector("#product_product_extra_fields_FOB\\ -\\ Supplier");
            const textID = document.querySelector("#product_product_extra_fields_Hidden\\ -\\ Supplier\\ ID");

            if (suppliers.length > 0 && selectID) {
                suppliers.forEach(supplier => {
                    console.log(`ID: ${supplier.ID}, Name: ${supplier.Name}`);
                    const option = document.createElement("option");
                    option.textContent = supplier.Name;
                    option.value = supplier.ID;
                    selectID.appendChild(option);
                });
            }

            // Set the current supplier ID as the selected value
            if (selectID && textID) {
                const currentSupplierID = textID.value;
                selectID.value = currentSupplierID;

                // Hide the text input's parent
                textID.parentElement.style.display = "none";

                // Add an event listener for changes in the select element
                selectID.addEventListener("change", () => {
                    textID.value = selectID.value;
                });
            }
        }
        else {
            // Error case: Handle the PHP error response
            console.error("Error fetching Suppliers:", result.error);
            Swal.fire({
                title: 'Alert',
                html: "Error fetching Suppliers",
            });                
        }
  });
}

 
////////////////////////////////////////////////////////
// Product Validation **********************************************
////////////////////////////////////////////////////////

if (window.location.pathname.startsWith('/products/')) {

    // PRODUCT VALIDATION PROCESS
    async function pValidation(endedTask) {

            const tab_main = document.querySelector("div#main.tab-pane");        
            const tab_Options = document.querySelector("div#product_options.tab-pane");
            const tab_Variants = document.querySelector("div#product_variants.tab-pane");

            const a_main = document.querySelector('a[href="#main"]');                    
            const a_Options = document.querySelector('a[href="#product_options"]');                    
            const a_Variants = document.querySelector('a[href="#product_variants"]');                    

            // Validacion #1 | MAIN tab : Product Name and Part Number
            const productPartNumber = tab_main.querySelector('#product_part_number');
            const productNameEnUs = tab_main.querySelector('#product_name_en_us');
            
            if (!productPartNumber.value.trim()) {
                a_main.click();
                await Swal.fire({
                    title: 'Alert!',
                    html: 'The <b>Code</b> field is required'
                });
                return false;          
            }

            if (/\s/.test(productPartNumber.value)) {
                a_main.click();
                await Swal.fire({ 
                  title: 'Alert!',
                  html: 'The <b>Code</b> field must not contain spaces. Please fix it.'
                });
                return false;
            }

            if (!productNameEnUs.value.trim()) {
                a_main.click();
                await Swal.fire({
                    title: 'Alert!',
                    html: 'The <b>Name</b> field is required'
                });
                return false;          
            }

           // Validacion #2: En cada Customization, Special Request / Custom       
           const option_rows = tab_Options.querySelectorAll("table tbody tr:not([style*='display: none;'])");

           // Verificar si existe el CUS_SIZE
           customIsNeeded = false;
           for (const row of option_rows) {
                const customSelect_qry = row.querySelector("td:nth-child(1) select");
                customSelect = customSelect_qry.options[customSelect_qry.selectedIndex].text;
                console.log("CUS_SIZE customSelect: " + customSelect);

                const [customName, customCode] = customSelect?.split(" - ") || ["", ""];

                // Size or Customization
                if (customCode === "CUS_SIZE") {
                    customIsNeeded = true;
                    console.log("CUS_SIZE found, 'Custom' in Size is needed");
                    break;
                }
           }

           // Validar
           for (const row of option_rows) {
               console.log("***********************************");
               const customSelect_qry = row.querySelector("td:nth-child(1) select");
               const allAvailableCheckbox = row.querySelector("td:nth-child(2) input[type='checkbox']");
               const optionCheckboxes = row.querySelectorAll("td:nth-child(3) input[type='checkbox']");

               // Getting the selected option
               customSelect = customSelect_qry.options[customSelect_qry.selectedIndex].text;
               console.log("customSelect: " + customSelect);

               // Extract customCode (after the dash "-") and customName (before the dash "-")
               const [customName, customCode] = customSelect?.split(" - ") || ["", ""];
               console.log("customCode: [" + customCode + "]");
               console.log("customName: [" + customName + "]");
               console.log("optionCheckBoxes: " + optionCheckboxes.length);
               console.log("allAvailableCheckbox: " + allAvailableCheckbox.checked);
               // 
               if (customCode === undefined) {
                    continue;
               }

               // Size or Customization
               if (customCode === "SIZE") {
                    console.log("It's SIZE");
                    //
                    sizeValidated = false;
                    NA_validated = true;
                    CUSTOM_validated = false;
                    //
                    if (allAvailableCheckbox.checked) {
                        // All options selected for Size, VALIDATION TRUE
                        console.log("All options selected for Size");
                        sizeValidated = true;                                                                
                    }
                    else {
                        console.log("Specific options selected for Size");
                        anyOptionChecked = false;
                        for (const checkbox of optionCheckboxes) {
                            if (checkbox.checked) {
                                anyOptionChecked = true;
                            }
                        }
                        //
                        if (anyOptionChecked == false) {
                            console.log("No options selected for Size");
                            // All Options = false + Any Option = false => Size Option is UNUSED,  VALIDATION TRUE
                            sizeValidated = true;
                        }
                        else {
                            console.log("At least one option is checked for Size");                                                                 
                            // CUS_SIZE was selected, look for the "Custom" option
                            console.log("Custom is NEEDED? " + customIsNeeded);
                            if (customIsNeeded == true) { 
                                for (const checkbox of optionCheckboxes) {
                                    if (checkbox.checked) {
                                        const label = checkbox.parentNode; // <label> that wraps the input and text
                                        for (const node of label.childNodes) {    
                                            if (node.textContent.trim() === "Custom") {
                                                CUSTOM_validated = true; // Custom found, VALIDATION TRUE                                      
                                                console.log("CUSTOM validated!");
                                            }          
                                        }        
                                    }
                                }                                        
                            }
                            else {
                                CUSTOM_validated = true;
                            }
                            // Validating N/A
                            /*
                            for (const checkbox of optionCheckboxes) {
                                if (checkbox.checked) {
                                    const label = checkbox.parentNode; // <label> that wraps the input and text
                                    for (const node of label.childNodes) {
                                        if (node.textContent.trim() === "N/A") {
                                            NA_validated = true; // Custom found, VALIDATION TRUE                                      
                                            console.log("N/A validated!");
                                        }  
                                    }        
                                }
                            } 
                            */                                       
                            // Checking
                            if (CUSTOM_validated == true && NA_validated == true) {   
                                sizeValidated = true; // Found, VALIDATE TRUE      
                                console.log("sizeValidated: TRUE!");                                                          
                            }                            
                                
                        }
                    }
                    //
                    if (sizeValidated == false) {   
                        console.log("Error message");
                        text = "The following option(s) is/are required for the <b>Size</b> category, on the 'Product Option' tab: ";
                        text = text + `<ul style='list-style:disc;list-style-position: inside;'>`;
                        if (CUSTOM_validated == false) {
                            text = text + `<li>"Custom"</li>`;
                        }          
                        if (NA_validated == false) {                           
                            //if (text != "") {text = text + " and ";}
                            text = text + `<li>"N/A"</li>`;
                        }                 
                        text = text + `</ul>`;       
                        //
                        a_Options.click();
                        await Swal.fire({
                            title: 'Alert',
                            html: text,
                        });
                        return false;
                    }

               } else if (customCode === "COLOR") {
                    console.log("It's COLOR");
                    //
                    colorValidated = false;
                    NA_validated = true;                                        
                    if (allAvailableCheckbox.checked) {
                        // All options selected for Color, VALIDATION TRUE
                        console.log("All options selected for Color");
                        colorValidated = true;                                                                
                    }
                    else {
                        console.log("Specific options for Color");
                        anyOptionChecked = false;
                        for (const checkbox of optionCheckboxes) {
                            if (checkbox.checked) {
                                anyOptionChecked = true;                                
                            }
                        }                        
                        //
                        if (anyOptionChecked == false) {
                            // All Options = false + Any Option = false => Color Option is UNUSED,  VALIDATION TRUE
                            console.log("No options selected for Color");
                            colorValidated = true;
                        }
                        else {                            
                            console.log("At least one option is checked for Color");     
                            for (const checkbox of optionCheckboxes) {
                                if (checkbox.checked == true) {        
                                    colorValidated = true; // Found, VALIDATE TRUE      
                                    console.log("colorValidated: TRUE!");                                                          
                                    /*
                                    const label = checkbox.parentNode;                                     
                                    for (const node of label.childNodes) {
                                        if (node.textContent.trim() === "N/A") {
                                            NA_validated = true; // Custom found, VALIDATION TRUE                                      
                                            console.log("N/A validated!");
                                        }                                          
                                    }        
                                    */    
                                }
                            }    
                            /*
                            if (NA_validated == true) {                                            
                                colorValidated = true; // Found, VALIDATE TRUE      
                                console.log("colorValidated: TRUE!");                                                          
                            } 
                            */                               
                        }
                    }
                    //
                    if (!colorValidated) {                           
                        a_Options.click();
                        await Swal.fire({
                            title: 'Alert',
                            html: `It's required to select <b>"N/A"</b> for the <b>Color</b> category, on the 'Product Option' tab.`,
                        });
                        return false;
                    }               
               
               } else if (customCode.startsWith("CUS_")) {
                   console.log("It's CUSTOMIZATION OPTION");
                   //                   
                   cusValidated = false;
                   SR_validated = false;
                   NA_validated = false;                            
                   //   
                   if (allAvailableCheckbox.checked) {
                        // All options selected for Size, VALIDATION TRUE
                        console.log("All options selected for CUSTOMIZATION");
                        cusValidated = true;                                                                
                   }
                   else {
                        console.log("Specific options");
                        anyChecked = false;
                        for (const checkbox of optionCheckboxes) {                   
                            if (checkbox.checked) {
                                anyChecked = true;
                            }
                        }
                        if (anyChecked == false) {
                            // No All, No option checked / UNUSED
                            console.log("No option selected for CUSTOMIZATION");
                            cusValidated = true;
                        }                       
                        else {
                            console.log("At least one option is checked for CUSTOMIZATION");
                            // At least one option is selected: Look for the special request:
                            for (const checkbox of optionCheckboxes) {                   
                                if (checkbox.checked) {
                                    const label = checkbox.parentNode; // <label> that wraps the input and text
                                    for (const node of label.childNodes) {
                                        if (node.textContent.trim().startsWith("Special Request")) {
                                            SR_validated = true; // Found, VALIDATE TRUE 
                                            console.log("N/A validated!");
                                        }                                          
                                        if (node.textContent.trim() === "N/A") {
                                            NA_validated = true; // Custom found, VALIDATION TRUE                                      
                                            console.log("N/A validated!");
                                        }  
                                    }        
                                    //
                                }
                            }
                            //
                            if (SR_validated == true && NA_validated == true) {
                                cusValidated = true; // Found, VALIDATE TRUE                                                                
                                console.log("cusValidated: TRUE!");                                        
                            }
                        }
                   } 

                   if (cusValidated == null) {        
                        text = "The following option(s) is/are required for the <b>" + customName + "</b> category, on the 'Product Option' tab: ";
                        text = text + `<ul style='list-style:disc;list-style-position: inside;'>`;
                        if (SR_validated == false) {
                            text = text + `<li>"Special Request"</li>`;
                        }          
                        if (NA_validated == false) {                           
                            //if (text != "") {text = text + " and ";}
                            text = text + `<li>"N/A"</li>`;
                        }                        
                        text = text + `</ul>`;
                        //
                       a_Options.click();
                       await Swal.fire({
                           title: 'Alert',
                           html: text,                           
                       });
                       return false;
                   }

               }		

           }

            // Validacion #1: IF OPTIONS IN (SIZE, COLOR), REQUIRE VARIANTS ENTERED

            lb_mustHaveVariants = false;

            for (const select of tab_Options.querySelectorAll('select[name^="product["]')) {                
                const selectedValue = select.options[select.selectedIndex].text; // Texto de la opción seleccionada
                console.log(selectedValue);
                const parts = selectedValue.split('-');

                
                if (parts.length > 1 && (parts[1].trim() === 'SIZE' || parts[1].trim() === 'COLOR')) {
                    console.log("Tiene Size o Color, debe tener variantes");
                    lb_mustHaveVariants = true;
                    break;
                }
            };

            if (lb_mustHaveVariants) {
                console.log("Reviewing Variants:")
                const inputs = tab_Variants.querySelectorAll('input[name^="variants_codes"]');
                console.log("Variants fields: " + inputs.length);

                // Revisa si hay inputs ya creados, en primer lugar
                if (inputs.length === 0) {                    
                    console.log("No variant fields found. Notifying (Exit)");
                    a_Variants.click();
                    await Swal.fire({
                        title: 'Alert!',
                        html: 'Please add the missing <b>variants</b> for this product on the "Code & price variants" tab, ensuring that the "Active" checkbox is marked as checked for each variant.'
                    });
                    return false;
                }
                            
                // Revisa si alguno de los inputs tiene un valor vacío        
                console.log("Variant fields found, checking...");
                lb_input_vacio = false;
                lb_bad_sku = false;
                for (const input of inputs) {
                    if (input.value.trim() === '') {
                        console.log("Input empty found");
                        lb_input_vacio = true;
                        break;
                    }
                    else {  
                        if (!(input.value.includes(productPartNumber.value.trim()))) {
                            console.log("Wrong SKU found: " + input.value);
                            lb_bad_sku = true;
                            break;
                        }                        
                    }

                }

                if (lb_input_vacio) {
                    console.log("Notifying empty fields");
                    a_Variants.click();
                    await Swal.fire({
                        title: 'Alert!',
                        html: 'On the "Code & Price Variants" tab, all variants should have a SKU code, and at least one must be marked as "Active". Please check.'
                    });
                    return false;                    
                }
                else {
                    console.log("All variant fields have values");
                }
        
                if (lb_bad_sku) {
                    console.log("Notifying wrong SKU");
                    a_Variants.click();
                    await Swal.fire({
                        title: 'Alert!',
                        html: 'On the "Code & Price Variants" tab, some variants code do not include the product code [' + productPartNumber.value.trim() + ']. Please check.'
                    });
                    return false;                    
                }
                else {
                    console.log("All variant SKU code are correct");
                }
            }



            // Realiza la validacion #3: PRICE MODIFICATIONS, at least one must be entered
            // const tab_PriceModifications = document.querySelector("div#product_price_modifications.tab-pane");
            console.log("PRODUCTO VALIDADO!");    
            if (endedTask) {
                await Swal.fire({
                    title: 'Success!',
                    html: 'The product has been successfully validated.'
                });
            }

            return true;
    }
    
    document.addEventListener("DOMContentLoaded", function () {

        // Creating a button Validate!
        const button = document.createElement("button");
        button.className = "btn btn-success btn-stay float-right";
        button.style.backgroundColor = "purple";
        button.style.marginLeft = "5px";
        button.textContent = "Validate!";
    
        //document.querySelector('button[type="submit"][name="save_and_stay"]').insertAdjacentElement("afterend", button);
        document.querySelector('button[name="save_and_stay"]').closest('div').insertAdjacentElement("beforeend", button);        
    
        button.addEventListener("click", async (event) => {
            document.body.style.cursor = 'wait';    
            event.preventDefault();
            event.stopPropagation(); // Prevent on the paret element only 
            await pValidation(true);
            document.body.style.cursor = 'default';
        });
    
    
        // Event in the SAVE button
        const submitButton = document.querySelector('input[type="submit"][name="commit"]');

        if (submitButton) {
            // Escucha el evento click del botón
            submitButton.addEventListener("click", async function (event) {
                // Evita el envío inmediato del formulario
                event.preventDefault();

                // Mostrar mensaje de confirmación
                const isValid = await pValidation(false);

                
                if (isValid) {
                    console.log("PRODUCTO VALIDADO!");
                    // Si el usuario elige "Sí", busca y envía el formulario relacionado
                    const form = submitButton.closest("form");
                    if (form) {
                        form.submit();
                    } else {
                        console.error("No se encontró ningún formulario asociado al botón.");
                    }
                } else {
                    console.log("VALIDACION FALLÓ!");
                    event.stopImmediatePropagation();
                    // Si el usuario elige "No", el formulario no se envía                    
                }

            });
        } else {
            console.error("No se encontró ningún botón submit en la página.");
        }

        // Event in the SAVE AND STAY button
        const saveAndstayButton = document.querySelector('button[type="submit"][name="save_and_stay"]');
        if (saveAndstayButton) {
            // Escucha el evento click del botón
            saveAndstayButton.addEventListener("click", async function (event) {
                // Evita el envío inmediato del formulario
                // event.preventDefault();

                // Mostrar mensaje de confirmación
                const isValid = await pValidation(false);

                
                if (isValid) {
                    console.log("PRODUCTO VALIDADO!");
                    // Si el usuario elige "Sí", busca y envía el formulario relacionado
                    const form = saveAndstayButton.closest("form");
                    if (form) {
                        //form.submit();
                    } else {
                        console.error("No se encontró ningún formulario asociado al botón.");
                    }
                } else {
                    console.log("VALIDACION FALLÓ!");
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    // Si el usuario elige "No", el formulario no se envía                    
                }

            }, true);
        } else {
            console.error("No se encontró ningún botón save and stay en la página.");
        }

    });

}


////////////////////////////////////////////////////////
// AutoPopulate SKU CTRL+M   **********************************************
////////////////////////////////////////////////////////

if (window.location.pathname.startsWith('/products/')) {
  document.addEventListener("DOMContentLoaded", () => {
      // Fetch options (Size or Color) asynchronously
      async function fetchOptions(param) {
          const myList = {};
          try {
              // Set the cursor to 'wait'
              document.body.style.cursor = 'wait';

              // Perform the Fetch request
              const response = await fetch(`https://mi-web-php-ddov.vercel.app/api/layer.php?process=b2b_ctrl_m_options&group=${param}`);
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }

              const result = await response.json();
    
              // Handle the PHP response structure
              if (result.success) {
                    const data = result.data;
                    // Ensure the response has the expected structure
                    if (data[0] && data[0].option && Array.isArray(data[0].option.option_values)) {
                        const optionValues = data[0].option.option_values;

                        // Populate the list
                        optionValues.forEach(item => {
                            if (item.id && item.code) {
                                myList[String(item.id)] = String(item.code);
                            }
                        });
                    } else {
                        console.error("Unexpected response structure:", data);
                    }
              }
              else {
                    // Error case: Handle the PHP error response
                    console.error("Error fetching options:", result.error);
                    Swal.fire({
                        title: 'Alert',
                        html: "Error fetching options",
                    });            
              }              
          } catch (error) {
              console.error("Error fetching options:", error);
              Swal.fire({
                title: 'Alert',
                html: "Error fetching options: " + error,
             });                  
          } finally {
              // Reset the cursor back to default
              document.body.style.cursor = 'default';
          }

          return myList;
      }

      // Generate product code
      function generateProductCode(sku, variant, sizeList, colorList) {
          let sizeCode = '';
          let colorCode = '';

          // Iterate over variant codes
          variant.split(',').forEach(code => {
              code = String(code); // Ensure code is a string
              if (sizeList[code]) {
                  sizeCode = sizeList[code];
              } else if (colorList[code]) {
                  colorCode = colorList[code];
              }
          });

          // Format and return the product code
          if (!sizeCode && !colorCode) {
            return `${sku}`;
          }          
          else if (!sizeCode) {
            return `${sku}-${colorCode}`;
          }
          else if (!colorCode) {
            return `${sku}-${sizeCode}`;
          }
          else {
            return `${sku}-${colorCode}-${sizeCode}`;
          }
          
      }

      async function autopopulateSKU() {
        try {
            document.body.style.cursor = 'wait';    

            // Fetch size and color lists
            const sizeList = await fetchOptions("Size");
            const colorList = await fetchOptions("Color");

            // Get SKU field value
            const inputSKUField = document.querySelector('input[id="product_part_number"]');
            const inputSKUValue = inputSKUField ? inputSKUField.value : '';
            if (!inputSKUValue) {
                console.error('Input field "product_part_number" is missing or empty.');
                return;
            }

            console.log("Input SKU Value:", inputSKUValue);

            // Process each variant input field
            const inputFields = document.querySelectorAll('input[name^="variants_codes"]');
            inputFields.forEach((field) => {
                const name = field.getAttribute('name');
                const startIndex = 'variants_codes'.length;
                let variantWithBrackets = name.substring(startIndex).replace(/^\[|\]$/g, '');

                // Generate product code
                const productCode = generateProductCode(inputSKUValue, variantWithBrackets, sizeList, colorList);

                console.log("Generated Product Code:", productCode); // Debugging
                field.value = productCode; // Update input field value

                // Active checkbox
                const active_checkbox = field.closest('td').querySelector('input[type="checkbox"][name^="variants_active"]');
                active_checkbox.checked = true;
            });

            document.body.style.cursor = 'default';                
            // Final message
            Swal.fire({
                  title: 'Alert',
                  html: "The SKU codes were filled in successfully.",
            });

        } catch (error) {
            document.body.style.cursor = 'default';                
            console.error("Error processing Ctrl + M action:", error);
        }


      }

    
      // Keydown event for Ctrl + M
      document.addEventListener('keydown', async (event) => {
          if (event.ctrlKey && (event.key === 'm' || event.key === 'M')) {
              event.preventDefault();
              await autopopulateSKU();
          }
      });

      // Creating button 
      const button = document.createElement("button");
      button.className = "btn btn-info mr-2";
      button.style.backgroundColor = "blue";
      button.style.marginLeft = "5px";
      button.style.marginRight = "15px";
      button.textContent = "Auto-fill SKUs";
      
      document.querySelector('a[id="create_product_variants"]').insertAdjacentElement("afterend", button);

      button.addEventListener("click", async (event) => {
          document.body.style.cursor = 'wait';    
          event.preventDefault();
          event.stopPropagation(); // Prevent on the paret element only 
          await autopopulateSKU();
          document.body.style.cursor = 'default';
      });

      
  });
}

////////////////////////////////////////////////////////
// AutoPopulate Prices CTRL+B **********************************************
////////////////////////////////////////////////////////

if (window.location.pathname.startsWith('/products/')) {

  document.addEventListener("DOMContentLoaded", () => {
      // Function to fetch product prices
      async function fetchProductPrices() {
          try {
              const response = await fetch("https://mi-web-php-ddov.vercel.app/api/layer.php?process=b2b_ctrl_b_prices");
              if (!response.ok) {
                  throw new Error(`Error fetching product prices: ${response.statusText}`);
              }
              return await response.json();              
          } catch (error) {
              console.error("Error fetching product prices:", error);
              return [];
          }
      }

      // Function to fetch products by category
      async function fetchProductsByCategory(categoryID) {
          try {
              const response = await fetch(`https://mi-web-php-ddov.vercel.app/api/layer.php?process=b2b_ctrl_b_ProByCat&category_id_eq=${categoryID}`);
              if (!response.ok) {
                  throw new Error(`Error fetching category ${categoryID}: ${response.statusText}`);
              }
              return await response.json();
          } catch (error) {
              console.error(`Error fetching products for category ${categoryID}:`, error);
              return [];
          }
      }

      // Main function to handle Ctrl + B
      async function handleCtrlB() {
          const allKeyValuePairs = {};
          // Customizations
          const categoryIDs = [42, 43, 44, 45, 46, 47, 48, 49];

          // Fetch all prices
          const result = await fetchProductPrices();
          if (result.success) {
                const allPrices = result.data;
                // Fetch custom prices by customization category
                for (const categoryID of categoryIDs) {

                    const result2 = await fetchProductsByCategory(categoryID);
                    if (result2.success) {
                        const products = result2.data;

                        products.forEach(product => {
                            const matchingPrice = allPrices.find(apItem => apItem.product_id === product.id);

                            if (matchingPrice) {
                                allKeyValuePairs[product.name] = matchingPrice.price;
                            } else {
                                console.warn(`Price not found for product ID: ${product.id}`);
                            }
                        });

                        return {"success": true, "data": allKeyValuePairs};
                    }
                    else {
                        // Error case: Handle the PHP error response
                        console.error("Error fetching products by category:", result2.error);
                        Swal.fire({
                            title: 'Alert',
                            html: "Error fetching products by category: " + result2.error,
                        });                                          
                        return {"success": false };
                    }
                    
                }
            } else {
                    // Error case: Handle the PHP error response
                    console.error("Error fetching product prices:", result.error);
                    Swal.fire({
                        title: 'Alert',
                        html: "Error fetching product prices: " + result.error,
                    });
                    return {"success": false };
                        
            }
      }

      // Autopopulate
      async function autopopulatePrices() {
            document.body.style.cursor = 'wait';

            const ret = await handleCtrlB();
            if (!ret.success) {
                return;
            }
            allKeyValuePairs = ret.data;
            console.log("Final Key-Value Pairs:", allKeyValuePairs);

            // Update price inputs
            document.querySelectorAll('#product_price_modifications table.dataTable tbody tr').forEach(row => {
                const optionValue = row.querySelector('td:nth-child(2)').textContent.trim();
                const priceInput = row.querySelector('input.price-modification');

                const price = allKeyValuePairs[optionValue];
                if (priceInput.value === "" || priceInput.value === null) {
                if (!price || parseFloat(price) <= 0) {
                    priceInput.value = ""; // Set the input to empty
                } else {
                    priceInput.value = parseFloat(price).toFixed(2); // Format and set the price
                }                        
                }
                else {
                // Do nothing. Don't overwrite existing values
                }
            });

            document.body.style.cursor = 'default';
            // Final message
            Swal.fire({
            title: 'Alert',
            html: "The default prices were filled in successfully.",
            });

      }


      // Event listener for Ctrl + B
      document.addEventListener("keydown", async (event) => {
          if (event.ctrlKey && (event.key === 'b' || event.key === 'B')) {            
                // Set the cursor to 'wait'
                autopopulatePrices();
          }
      });

      // Creating button 
      const button = document.createElement("button");
      button.className = "btn btn-info mr-2";
      button.style.backgroundColor = "blue";
      button.style.marginLeft = "5px";
      button.style.marginRight = "15px";
      button.textContent = "Auto-fill Prices";
      
      document.querySelector('#product_price_modifications table').insertAdjacentElement("beforebegin", button);

      button.addEventListener("click", async (event) => {
          document.body.style.cursor = 'wait';    
          event.preventDefault();
          event.stopPropagation(); // Prevent on the paret element only 
          await autopopulatePrices();
          document.body.style.cursor = 'default';
      });



  });
}



////////////////////////////////////////////////////////
// Products - Instructions
////////////////////////////////////////////////////////
if (window.location.pathname.startsWith('/products/')) {
  document.addEventListener("DOMContentLoaded", () => {
      // Add instructions to #product_price_modifications
      const priceInstructions = document.createElement("div");
      priceInstructions.style.border = "1px solid gray";
      priceInstructions.style.padding = "20px";
      priceInstructions.style.backgroundColor = "rgb(240,240,240)";
      priceInstructions.style.marginBottom = "20px";
      priceInstructions.innerHTML = `
          <b>Instructions:</b>
          <ul>
              <li>Press [Autopopulate Prices] to automatically fill in the default prices.</li>
          </ul>
      `;
      const productPriceModifications = document.querySelector('#product_price_modifications');
      if (productPriceModifications) {
          productPriceModifications.insertAdjacentElement("afterbegin", priceInstructions);
      }

      // Add instructions to #product_variants
      const variantInstructions = document.createElement("div");
      variantInstructions.style.border = "1px solid gray";
      variantInstructions.style.padding = "20px";
      variantInstructions.style.backgroundColor = "rgb(240,240,240)";
      variantInstructions.style.marginBottom = "20px";
      variantInstructions.innerHTML = `
          <b>Instructions:</b>
          <ul>
              <li>Check [Size] and [Color] from the list below.</li>
              <li>Click on [Create Code Price Variants] to create combinations.</li>
              <li>Press [Autopopulate SKUs] to automatically populate the SKUs based on the naming convention.</li>
          </ul>
      `;
      const productVariants = document.querySelector('#product_variants');
      if (productVariants) {
          productVariants.insertAdjacentElement("afterbegin", variantInstructions);
      }

      // Add the "Check SKU Conventions" link after the "Code" label
      const codeLabel = Array.from(document.querySelectorAll("label")).find(label => label.textContent.includes("Code"));
      if (codeLabel) {
          const skuConventionLink = document.createElement("a");
          skuConventionLink.id = "skuconvention";
          skuConventionLink.href = "#";
          skuConventionLink.style.marginLeft = "10%";
          skuConventionLink.textContent = "Check SKU Conventions";
          codeLabel.insertAdjacentElement("afterend", skuConventionLink);

          // Add click event listener for SKU Convention link
          skuConventionLink.addEventListener("click", (event) => {
              event.preventDefault(); // Prevent the default link action
              Swal.fire({
                  title: 'SKU Convention',
                  width: '600',
                  html: `
                      <ul style="text-align:left">
                          <li><b>KF466</b> - Constance (For Dress only)</li>
                          <li><b>KF466V2</b> - Constance V2 (For Dress versions)</li>
                          <li><b>KF466-BOW</b> - Constance with Bow (For Dress with Accessory)</li>
                          <li><b>VL-KF466</b> - Constance Veil (For Accessory only)</li>
                      </ul>
                  `,
              });
          });
      }

      const categoryLabel = Array.from(document.querySelectorAll("label")).find(label => label.textContent.includes("Category"));
      if (categoryLabel) {
          const catConventionLink = document.createElement("a");
          catConventionLink.id = "categoryConvention";
          catConventionLink.href = "#";
          catConventionLink.style.marginLeft = "5%";          
          catConventionLink.textContent = "Select the 'Collection'";
          categoryLabel.insertAdjacentElement("afterend", catConventionLink);     
      }

      const morecategoryLabel = Array.from(document.querySelectorAll("a")).find(label => label.textContent.includes("Add to more categories"));
      if (morecategoryLabel) {
          const morecatConventionLink = document.createElement("a");
          morecatConventionLink.id = "morecategoryConvention";
          morecatConventionLink.href = "#";
          morecatConventionLink.style.marginLeft = "5%";          
          morecatConventionLink.textContent = "Add the 'Item Type' (gown, accessory, etc) as additional category";
          morecategoryLabel.insertAdjacentElement("afterend", morecatConventionLink);     
      }

  });
}

////////////////////////////////////////////////////////
// Options - Instructions
////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  // Handle specific paths
  if (currentPath === '/admin/options/5/edit') {
      Swal.fire({
          title: 'Alert',
          html: "The <b>Size</b> option is commonly used to generate SKU codes. <span style='color:red'>Please avoid making changes and proceed carefully.</span>",
      });
  }

  if (currentPath === '/admin/options/2/edit') {
      Swal.fire({
          title: 'Alert',
          html: "The <b>Color</b> option is commonly used to generate SKU codes. <span style='color:red'>Please avoid making changes and proceed carefully.</span>",
      });
  }

  if (currentPath === '/admin/options/new') {
      // Add instructions for the option code
      const optionCodeInput = document.querySelector("input[id='option_code']");
      if (optionCodeInput) {
          const helperText = document.createElement("small");
          helperText.classList.add("form-text", "text-muted");
          helperText.innerHTML = `
              Enter a code starting with <span style='color:red'>CUS_</span> to indicate this as an option group for <b>customizations</b>.
              Use <span style='color:red'>CUSDET_</span> for fields where users can detail selected customization options.
          `;
          optionCodeInput.insertAdjacentElement("afterend", helperText);
      }

      // Add guidance for "Code" column header
      const codeHeader = Array.from(document.querySelectorAll("th")).find(th => th.textContent.includes("Code"));
      if (codeHeader) {
          const smallText = document.createElement("small");
          smallText.innerHTML = "Enter 3 letters followed by 2 numbers (e.g., CSC01, CSC02)";
          codeHeader.appendChild(document.createElement("br"));
          codeHeader.appendChild(smallText);
      }
  }

  if (/^\/admin\/options\/\d+\/edit$/.test(currentPath)) {
      // Append indicators for "Name" and "Code" column headers
      const nameHeader = Array.from(document.querySelectorAll("th")).find(th => th.textContent.includes("Name"));
      if (nameHeader) {
          const redAsterisk = document.createElement("span");
          redAsterisk.style.color = "red";
          redAsterisk.textContent = "*";
          nameHeader.appendChild(redAsterisk);
      }

      const codeHeader = Array.from(document.querySelectorAll("th")).find(th => th.textContent.includes("Code"));
      if (codeHeader) {
          const redAsterisk = document.createElement("span");
          redAsterisk.style.color = "red";
          redAsterisk.textContent = "*";

          const smallText = document.createElement("small");
          smallText.innerHTML = "Enter 3 letters followed by 2 numbers (e.g., CSC01)";

          codeHeader.appendChild(redAsterisk);
          codeHeader.appendChild(document.createElement("br"));
          codeHeader.appendChild(smallText);
      }
  }
});

////////////////////////////////////////////////////////
// Options - Validations on New Options entered
////////////////////////////////////////////////////////

if (window.location.pathname === '/admin/options/new' || /^\/admin\/options\/\d+\/edit$/.test(window.location.pathname)) {

    document.addEventListener("DOMContentLoaded", () => {

        async function optionValidation() {

            document.body.style = 'cursor: wait;';

            // Valida CODES
            const codeInputs = document.querySelectorAll('input[name^="option[option_values_attributes]"][name$="[code]"]');
            if (codeInputs.length > 0) {
                
                for (const input of codeInputs) {
                    if (input.value.trim() === '') {
                        input.focus();
                        input.scrollIntoView({block: "center"});
                        await Swal.fire({ 
                            title: 'Alert', 
                            html: 'Please enter a value for the field "Code"',
                        });
                        return false;
                    }
                }            
            }

            // Valida NAMES
            const nameInputs = document.querySelectorAll('input[name^="option[option_values_attributes]"][name$="[name_en_us]"]');
            if (nameInputs.length > 0) {
                
                for (const input of nameInputs) {
                    if (input.value.trim() === '') {
                        input.focus();
                        input.scrollIntoView({block: "center"});
                        await Swal.fire({ 
                            title: 'Alert', 
                            html: 'Please enter a value for the field "Name"',
                        });
                        return false;                      
                    }
                }            
            }


            // CONVERT OPTIONS AS ITEMS/PRODUCTS
            /*
            oGroupName = document.querySelector('input[id="option_name_en_us"]').value
            oGroupCode = document.querySelector('input[id="option_code"]').value

            const table = document.querySelector('table');

            table.querySelectorAll('tr').forEach(async row  =>  {
                const secondColumnInput = row.querySelector('td:nth-child(2) input:not([value])');
                const thirdColumnInput = row.querySelector('td:nth-child(3) input:not([value])');

                // Verifica si los inputs existen y tienen valores ingresados manualmente
                if (secondColumnInput && secondColumnInput.value && thirdColumnInput && thirdColumnInput.value) {
                    oValueName = secondColumnInput.value;
                    oValueCode = thirdColumnInput.value;

                    console.log(`### oGroupCode: ${oGroupCode}, oGroupName: ${oGroupName}, oValueCode: ${oValueCode}, oValueName: ${oValueName}`);                    

                    const response = await fetch(`https://mi-web-php-ddov.vercel.app/api/b2bScripts/b2b_convert_options.php?oGroup_Code=${oGroupCode}&oGroup_Name=${oGroupName}&oValue_Code=${oValueCode}&oValue_Name=${oValueName}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
      
                    const result = await response.json();

                    if (!(result.success))
                    {
                        await Swal.fire({
                            title: 'Alert',
                            html: "Error syncing option [" + oValueCode + "] : " + result.error,
                        });                    
                        console.error("Error syncing options:", result.error);
                        document.body.style = 'cursor: default;';
                        return false;    
                    }
                    else {
                        console.log(result);
                    }
        
                } 
            });
            */
            //
            document.body.style = 'cursor: default;';
            return true;
        }

        //////////////////////////////////////////////////
        // CLICK LISTENER
        //////////////////////////////////////////////////
        optionSubmitButton = document.querySelector('input[type="submit"][name="commit"]');
        
        optionSubmitButton.addEventListener('click', async function(event) {                
            event.preventDefault(); // Evita que el formulario se envíe automáticamente                        

            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we process your request.',
                allowOutsideClick: false, // Prevent closing the popup by clicking outside
                allowEscapeKey: false,   // Prevent closing with escape key
                didOpen: () => {
                  Swal.showLoading(); // Show a loading spinner
                }
              });
    
            const isValid = await optionValidation();

            Swal.close();

            if (isValid) {                
                console.log("OPTION VALIDADO!");
                //
                const form = optionSubmitButton.closest("form");
                if (form) {
                    form.submit();
                } else {
                    console.error("No se encontró ningún formulario asociado al botón.");
                }
            } else {
                console.log("VALIDACION FALLÓ!");
                event.stopImmediatePropagation();                
            }

        });        

        //
    });
}

/////////////////////////////////////////////////////////
// Product - Tab Options (Checkboxes behavior)
////////////////////////////////////////////////////////
if (window.location.pathname.startsWith('/products/')) {

    // 
    document.addEventListener("DOMContentLoaded", () => {

        function rowListeners(ref){
            //
            const allAvailableCheckboxes = ref.querySelectorAll("td:nth-child(2) input[type='checkbox']");
            const optionCheckboxes = ref.querySelectorAll("td:nth-child(3) input[type='checkbox']");                            
            console.log("allAvailableCheckbox : " + allAvailableCheckboxes.length);
            console.log("optionCheckboxes : " + optionCheckboxes.length);    

            if (optionCheckboxes.length > 0) {
                
                console.log("There are " + optionCheckboxes.length + " options for this product");

                //
                allAvailableCheckboxes.forEach(checkbox => {
                    addNewLink = checkbox.closest('tr').querySelector("td:nth-child(3) a.add-new-option-value.pull-right"); 
                    if (addNewLink) {
                        addNewLink.setAttribute("hidden", true);        
                    }
                    //    
                    checkbox.addEventListener("change", function () {
                        console.log("You checked/unchecked a [All Options]");
                        if (this.checked) {
                            console.log("[All Options] checked");
                            const nextTd = this.closest('td').nextElementSibling;
                            const checkboxesInNextTd = nextTd.querySelectorAll("input[type='checkbox']");            
                            checkboxesInNextTd.forEach(nextCheckbox => {
                                nextCheckbox.checked = false;
                            });                
                        }
                        // IF Size or Color is changed, disable the submit button
                        selectField = this.closest('tr').querySelector("td:nth-child(1) select"); 
                        customSelect = selectField.options[selectField.selectedIndex].text;                        
                        const [customName, customCode] = customSelect?.split(" - ") || ["", ""];
                        if (customCode == "SIZE" || customCode == "COLOR") {
                            const submitButton = document.querySelector('input[type="submit"][name="commit"]');
                            submitButton.style.display = 'none';                     
                        }
                    });
                });
                //
                optionCheckboxes.forEach(checkbox => {
                    checkbox.addEventListener("change", function () {
                        console.log("You checked/unchecked an option");
                        if (this.checked) {
                            console.log("[Option] checked");
                            const prevTd = this.closest('td').previousElementSibling;
                            const checkboxInPreviousTd = prevTd.querySelector("input[type='checkbox']");
                            checkboxInPreviousTd.checked = false;
                        }
                        // IF Size or Color is changed, disable the submit button
                        selectField = this.closest('tr').querySelector("td:nth-child(1) select"); 
                        customSelect = selectField.options[selectField.selectedIndex].text;                        
                        const [customName, customCode] = customSelect?.split(" - ") || ["", ""];
                        if (customCode == "SIZE" || customCode == "COLOR") {
                            const submitButton = document.querySelector('input[type="submit"][name="commit"]');
                            submitButton.style.display = 'none';
                        }
                    });                
                })                  


                return true;
            }

            return false;
        }

        // Get "product_options" tab
        const productOptionsDiv = document.querySelector("#product_options");

        // Remove Association links
        productOptionsDiv.querySelectorAll('td.remove-association').forEach(td => {
            td.style.verticalAlign = 'top';
        });

        // Hide "Add New" links
        const addNewLinks = productOptionsDiv.querySelectorAll("table a.add-new-option-value.pull-right");
        addNewLinks.forEach(link => {
            link.setAttribute("hidden", true);
        });        

        // Update the text content of the third <th>
        const thirdHeader = productOptionsDiv.querySelector("table thead tr th:nth-child(3)");        
        thirdHeader.textContent = "Choose Specific";

        // Checkboxes
        document.addEventListener("click", (event) =>  {

            //Get the closest SELECT 
            selectObject = event.target.closest("table tbody tr td:nth-child(1) select");
            if (selectObject != null) {
                // Get the TR
                trObject = selectObject.closest("tr");
                console.log("Selected Item Number : " + selectObject.selectedIndex);
                console.log("Selected Value : " + selectObject.options[selectObject.selectedIndex].text);
                if (selectObject) {
                    if (selectObject.selectedIndex > 0) {
                        let contador = 0;
                        const maxEjecuciones = 10;
                        const idInterval = setInterval(() => {
                                            const resultado = rowListeners(trObject);
                                            if (resultado) {
                                                clearInterval(idInterval);
                                            } else {
                                                contador++;
                                                if (contador >= maxEjecuciones) {
                                                    clearInterval(idInterval);
                                                }
                                            }
                                        }, 1000);                       
                    }
                }                    
            }

        });

        // Existing checkboxes
        rowListeners(productOptionsDiv.querySelector("table tbody"));

    });
}

/////////////////////////////////////////////////////////
// Ctrl + J: CORRECT OPTION CHECKBOXES
/////////////////////////////////////////////////////////
if (window.location.pathname.startsWith('/products/')) {

    document.addEventListener("DOMContentLoaded", () => {
 
        document.addEventListener("keydown", async (event) => {
            if (event.ctrlKey && (event.key === 'j' || event.key === 'J')) {            

                document.body.style.cursor = 'wait';  

                console.log("VERIFYING the existing options");
                const optionCheckboxes = ref.querySelectorAll("#product_options table tbody td:nth-child(3) input[type='checkbox']");                            
            
 
                lb_x = false;
                for (const checkbox of optionCheckboxes) {      
                    if (checkbox.checked) { 
                        const prevTd = checkbox.closest('td').previousElementSibling;
                        const checkboxInPreviousTd = prevTd.querySelector("input[type='checkbox']");
                        if (checkboxInPreviousTd == true) {
                            checkboxInPreviousTd.checked = false;                            
                            lb_x = true
                        } 
                        
                    }
                }    

                document.body.style.cursor = 'default';
                // Final message
                if (lb_x == true){
                    Swal.fire({
                        title: 'Alert',
                        html: "The Option checkboxes were corrected successfully.",
                    });
                }
                else {
                    Swal.fire({
                        title: 'Alert',
                        html: "There were no corrections",
                    });
                }
                
            }
        });
    });
}