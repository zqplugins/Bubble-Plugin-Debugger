function(properties, context) {
    const styleNodeID = 'debuggerStyle';
    const styles = `
        div#message-container > p:nth-child(odd) {
            background: #cacaca;
        }

        #debugger-container {
            background: #e0e0e0;
        }

        #debugger-title {
            display: flex;
            align-items: center;
            padding: 10px;
        }

        #message-container {
            display: flex;
            flex-direction: column;
            max-height: ${properties.debugger_size}px;
            /* scroll-behavior: auto; */
            overflow: scroll;
            overflow-x: unset;
        }

        #debuggerControler {
            color: white;
            background: black;
            padding: 10px;
            border-radius: 20px;
            display: flex;
            position: absolute;
            align-content: center;
            justify-content: center;
            z-index:99;
        }

        div#message-container > p {
            padding: 4px;
            padding-left: 9px;
        }

        @media only screen and (max-width: 600px) {
            #debugger-title {
                display: flex;
                align-items: center;
                flex-direction: column;
            }
        }`;

    const styleNode = document.head.querySelector(`#${styleNodeID}`);
    if (!styleNode) {
        const styleElement = document.createElement('style');
        styleElement.id = styleNodeID;
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
    } else {
        styleNode.innerHTML = styles;
    }
    // console.log(document.head);

    // document.getElementsByTagName("head")[0].appendChild(styleElement);

    function appendMessage(type, message) {
        var messageChild = document.createElement("p");
        messageChild.className = type;
        var date = new Date();
        messageChild.innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + type + " " + message;
        document.getElementById("message-container").appendChild(messageChild);
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    if (window.location.href.indexOf("debug_mode=true") != -1 && !document.getElementById("debugger-container")) {
        let htmlReference = document.querySelector("head");
        let debuggerHTML = document.createElement("div");
        debuggerHTML.id = "debugger-container";
        debuggerHTML.className = "debugger-container";

        let debuggerTitleHTML = document.createElement("h1");
        debuggerTitleHTML.id = "debugger-title";
        debuggerTitleHTML.className = "debugger-title";
        debuggerTitleHTML.style.display = "flex";
        debuggerTitleHTML.style.alignItems = "center";
        debuggerTitleHTML.innerHTML = "Better Debugger Console";

        let debuggerOption = document.createElement("div");
        debuggerOption.style.display = "flex";
        debuggerOption.style.alignItems = "center";
        debuggerOption.style.marginLeft = "40px";
        debuggerOption.innerHTML = `  
	        <input type="checkbox" id="show-errors" checked="true">
            <label for="show-errors"> Show Error </label> &nbsp &nbsp
            <input type="checkbox" id="show-warnings" checked="true">
            <label for="show-warnings"> Show Warnings</label> &nbsp &nbsp
            <input type="checkbox" id="show-messages" checked="true">
            <label for="show-messages"> Show Messages</label><br> &nbsp &nbsp`;

        debuggerTitleHTML.appendChild(debuggerOption)

        debuggerHTML.appendChild(debuggerTitleHTML)
        insertAfter(debuggerHTML, htmlReference)

        var checkboxShowErrors = document.getElementById("show-errors")
        checkboxShowErrors.addEventListener('change', function () {
            if (this.checked) {
                let errorsNodes = Array.from(document.getElementsByClassName("❌"))

                errorsNodes.forEach(function (errornode, i) {
                    errornode.style.display = "initial"
                })
            } else {
                let errorsNodes = Array.from(document.getElementsByClassName("❌"))

                errorsNodes.forEach(function (errornode, i) {
                    errornode.style.display = "none"
                })
            }
        });

        var checkboxShowWarnings = document.getElementById("show-warnings")
        checkboxShowWarnings.addEventListener('change', function () {
            if (this.checked) {
                let errorsNodes = Array.from(document.getElementsByClassName("⚠️"))

                errorsNodes.forEach(function (errornode, i) {
                    errornode.style.display = "initial"
                })
            } else {
                let errorsNodes = Array.from(document.getElementsByClassName("⚠️"))

                errorsNodes.forEach(function (errornode, i) {
                    errornode.style.display = "none"
                })
            }
        });

        var checkboxShowMessages = document.getElementById("show-messages")
        checkboxShowMessages.addEventListener('change', function () {
            if (this.checked) {
                let errorsNodes = Array.from(document.getElementsByClassName("💬"))
                errorsNodes.forEach(function (errornode, i) {
                    errornode.style.display = "initial"
                })
            } else {
                let errorsNodes = Array.from(document.getElementsByClassName("💬"))
                console.log(errorsNodes)
                errorsNodes.forEach(function (errornode, i) {
                    errornode.style.display = "none"
                })
            }
        });

        var messageContainer = document.createElement("div")
        messageContainer.id = "message-container"
        messageContainer.style.display = "flex"
        messageContainer.style.flexDirection = "column"

        insertAfter(messageContainer, document.getElementById("debugger-title"))

        appendMessage(properties.type, properties.message_content)

        //// CONTROLER
        if (!document.getElementById("debuggerControler")) {
            function toggleVisibility(elementToggle) {
                if (elementToggle.style.display === "none") {
                    elementToggle.style.display = "block";
                    document.getElementById("debuggerControler").innerHTML =
                        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>`;
                } else {
                    elementToggle.style.display = "none";
                    document.getElementById("debuggerControler").innerHTML =
                        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                        </svg>`
                }
            }

            function clickWithoutDrag(element) {
                let clicked = false;
                element.addEventListener('mousedown', e => { clicked = true; });
                element.addEventListener('mousemove', e => { clicked = false; });
                element.addEventListener('mouseup', e => {
                    if (clicked) {
                        console.log("clicked", clicked)
                        toggleVisibility(document.getElementById("debugger-container"))
                    }

                    // Reset this back to false for next time
                    clicked = false;
                });
            }

            function dragElementMobile(box) {
                /* listen to the touchMove event,
                every time it fires, grab the location
                of touch and assign it to box */
                box.addEventListener('touchmove', function (e) {
                    // grab the location of touch
                    var touchLocation = e.targetTouches[0];

                    // assign box new coordinates based on the touch.
                    box.style.left = touchLocation.pageX + 'px';
                    box.style.top = touchLocation.pageY + 'px';
                })

                /* record the position of the touch
                when released using touchend event.
                This will be the drop position. */

                box.addEventListener('touchend', function (e) {
                    // current box position.
                    var x = parseInt(box.style.left);
                    var y = parseInt(box.style.top);
                })
            }

            function dragElement(elmnt) {
                var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                if (document.getElementById(elmnt.id + "header")) {
                    // if present, the header is where you move the DIV from:
                    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
                } else {
                    // otherwise, move the DIV from anywhere inside the DIV:
                    elmnt.onmousedown = dragMouseDown;
                }

                function dragMouseDown(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = elementDrag;
                }

                function elementDrag(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // calculate the new cursor position:
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    // set the element's new position:
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }

                function closeDragElement() {
                    // stop moving when mouse button is released:
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            }

            var controlerHTML = document.createElement("div")
            controlerHTML.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
            </svg>`;
            controlerHTML.id = "debuggerControler";
            controlerHTML.style.color = "white";
            controlerHTML.style.background = "black";

            // dragElement(controlerHTML);
            // dragElementMobile(controlerHTML);
            clickWithoutDrag(controlerHTML);

            insertAfter(controlerHTML, document.querySelector("head"));
        }
    } else if (document.getElementById("debugger-container")) {
        appendMessage(properties.type, properties.message_content)
    }
}