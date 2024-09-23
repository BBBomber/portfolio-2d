document.addEventListener("DOMContentLoaded", function () {
  const terminal = document.getElementById("terminal");

  // Preload the audio
  const typeSound = new Audio("sounds/click.wav");
  typeSound.preload = "auto";
  typeSound.volume = 0.1; // Adjust volume as needed

  const messages = [
    {
      type: "message",
      content: "Yashasvi's Portfolio/Resume website, [All rights reserved]",
    },
    {
      type: "message",
      content:
        "Hello! \nI've been working as a Game Developer since 2022 now...",
    },
    {
      type: "ascii",
      content: `
      ⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⣠⣤⣶⣶
      ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⢰⣿⣿⣿⣿
      ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣀⣀⣾⣿⣿⣿⣿
      ⣿⣿⣿⣿⣿⡏⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿
      ⣿⣿⣿⣿⣿⣿⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠁⠀⣿
      ⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠙⠿⠿⠿⠻⠿⠿⠟⠿⠛⠉⠀⠀⠀⠀⠀⣸⣿
      ⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿
      ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣴⣿⣿⣿⣿
      ⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⢰⣹⡆⠀⠀⠀⠀⠀⠀⣭⣷⠀⠀⠀⠸⣿⣿⣿⣿
      ⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠈⠉⠀⠀⠤⠄⠀⠀⠀⠉⠁⠀⠀⠀⠀⢿⣿⣿⣿
      ⣿⣿⣿⣿⣿⣿⣿⣿⢾⣿⣷⠀⠀⠀⠀⡠⠤⢄⠀⠀⠀⠠⣿⣿⣷⠀⢸⣿⣿⣿
      ⣿⣿⣿⣿⣿⣿⣿⣿⡀⠉⠀⠀⠀⠀⠀⢄⠀⢀⠀⠀⠀⠀⠉⠉⠁⠀⠀⣿⣿⣿
      ⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿
      ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿   
      \nPress Enter to continue...⠀⠀  
        `,
    },
    {
      type: "message",
      content:
        "But more importantly, have you noticed the control panel to the right?.",
    },
    {
      type: "message",
      content:
        "Try clicking on the pause button, or change the speed of the simulation running in the background.",
    },
    {
      type: "message",
      content:
        "The background is running an algorithm known as Conway's Game of Life",
    },
    {
      type: "input",
      content: "Type 'help' to learn the rule of Conway's Game of Life.",
      handler: function (input) {
        if (input.toLowerCase() === "help") {
          return {
            type: "message",
            content:
              "Underpopulation: A live cell with fewer than 2 live neighbors dies.\nSurvival: A live cell with 2 or 3 live neighbors stays alive.\nOverpopulation: A live cell with more than 3 live neighbors dies.\nReproduction: A dead cell with exactly 3 live neighbors becomes alive.",
          };
        } else {
          return {
            type: "message",
            content: "rude..",
          };
        }
      },
    },
    {
      type: "message",
      content:
        "You can mess around with the simulation btw. \nSimply pause, hide everything, and start adding your own pixels!",
    },
    {
      type: "message",
      content:
        "That's all for now. \nFeel free to look around, See ya... \n.. \n... \nunless..",
    },
    {
      type: "message",
      content: "........ \n... \nare you that bored..?",
    },
    {
      type: "message",
      content:
        "I made this website for absolutely no reason. \nI am bored for sure.",
    },
    {
      type: "message",
      content: "Wanna hear some cool lyrical punchlines?",
    },
    {
      type: "message",
      content:
        "Your appetite will put a dent up in a brothas salary, you need to stop burning that weed and burn a calorie \n -Lloyd Banks",
    },
    {
      type: "message",
      content:
        "She got a light skin friend look like Michael Jackson, she got a dark skin friend look like Michael Jackson \n -Ye",
    },
    {
      type: "message",
      content: "If I was a sculptor… but then again, no. \n -Elton John",
    },
    {
      type: "message",
      content:
        "That is it for the free trial. Pay me if you want to talk more.",
    },
    {
      type: "ascii",
      content: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⢀⣤⣤⣤⣶⣶⣷⣤⣀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⣶⣶⠀⠀⠀⠀⣠⣾⣿⣿⡇⠀⣿⣿⣿⣿⠿⠛⠉⠉⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⠀⠀⠀⠀⠀⢀⣿⣿⣶⡀⠀⠀⠀⠀⠀⣾⣿⣿⣿⡄⠀⢀⣴⣿⣿⣿⣿⠁⢸⣿⣿⣿⣀⣤⡀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⣼⣿⣿⣿⣧⠀⠀⠀⠀⢰⣿⣿⣿⣿⣇⣠⣿⣿⣿⣿⣿⡏⢠⣿⣿⣿⣿⣿⡿⠗⠂⠀⠀
⠀⠀⠀⣰⣾⣿⣿⠟⠛⠉⠉⠉⠉⠋⠀⠀⠀⣰⣿⣿⣿⣿⣿⣇⣠⣤⣤⣿⣿⣿⢿⣿⣿⣿⣿⢿⣿⣿⡿⠀⣼⣿⣿⡟⠉⠁⢀⣀⡄⠀⠀
⠀⢀⣾⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣴⣿⣿⣿⣿⡿⣿⣿⣿⡏⠈⢿⣿⣿⠏⣾⣿⣿⠃⢠⣿⣿⣿⣶⣶⣿⣿⣿⡷⠦⠀
⢠⣾⣿⡿⠀⠀⠀⣀⣠⣴⣶⣿⣿⡷⠀⣠⣿⣿⣿⣿⡿⠟⣿⣿⣿⣠⣿⣿⣿⠀⠀⠀⠀⠁⢸⣿⣿⡏⠀⣼⣿⣿⣿⠿⠛⠛⠉⠀⠀⠀⠀
⢸⣿⣿⠣⣴⣾⣿⣿⣿⣿⣿⣿⡿⠃⣰⣿⣿⣿⠋⠁⠀⠀⠸⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠸⠿⠿⠀⠀⠛⠛⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠸⣿⣿⣆⣉⣻⣭⣿⣿⣿⡿⠋⠀⠀⢿⣿⡿⠁⠀⠀⠀⠀⠀⠹⠟⠛⠛⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠙⠿⣿⣿⣿⣿⡿⠟⠋⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣶⣶⣶⣶⣦⣄⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣷⠄⣤⣤⣤⣤⣶⣾⣷⣴⣿⣿⣿⣿⠿⠿⠛⣻⣿⣿⣷⡄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣄⠀⣶⣶⣤⡀⠀⠀⠀⠀⠀⠀⢀⣴⣿⠋⢠⣿⣿⣿⠿⠛⠋⠉⠛⣿⣿⣿⠏⢀⣤⣾⣿⣿⡿⠋⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣾⣿⣿⣿⣿⠓⢹⣿⣿⣷⠀⠀⠀⠀⢀⣶⣿⡿⠁⠀⣾⣿⣿⣟⣠⣤⠀⠀⢸⣿⣿⣿⣾⣿⣿⣿⡟⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⡿⠛⠉⠸⣿⣦⡈⣿⣿⣿⡇⠀⠀⣰⣿⣿⡿⠁⠀⢸⣿⣿⣿⣿⣿⠿⠷⢀⣿⣿⣿⣿⡿⠛⣿⣿⣿⡀⠀⠀⠀
⠀⠀⠀⠀⢀⣼⣿⣿⡿⠋⠀⠀⠀⠀⣿⣿⣧⠘⣿⣿⣿⡀⣼⣿⣿⡟⠀⠀⢀⣿⣿⣿⠋⠁⠀⣀⣀⣼⣿⣿⡟⠁⠀⠀⠘⣿⣿⣧⠀⠀⠀
⠀⠀⠀⠀⣼⣿⣿⡟⠀⠀⠀⠀⠀⣠⣿⣿⣿⠀⢹⣿⣿⣿⣿⣿⡟⠀⠀⠀⣼⣿⣿⣷⣶⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠸⣿⣿⡆⠀⠀
⠀⠀⠀⠀⢹⣿⣿⣇⠀⠀⢀⣠⣴⣿⣿⣿⡿⠀⠈⣿⣿⣿⣿⡟⠀⠀⠀⢰⣿⣿⣿⠿⠟⠛⠉⠁⠸⢿⡟⠀⠀⠀⠀⠀⠀⠀⠘⠋⠁⠀⠀
⠀⠀⠀⠀⠈⢻⣿⣿⣿⣾⣿⣿⣿⣿⣿⠟⠁⠀⠀⠸⣿⣿⡿⠁⠀⠀⠀⠈⠙⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠛⠿⠿⠿⠿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                                          
        GAME OVER! check out the arcade for more time pass.
      `,
    },
    // You can add more messages or inputs as needed
  ];

  let messageIndex = 0;
  let charIndex = 0;
  let isTyping = false;
  let typingSpeed = 50; // Adjust typing speed as desired

  function typeMessage(message, callback) {
    isTyping = true;

    function typeChar() {
      if (charIndex < message.length) {
        const nextChar = message.charAt(charIndex);
        terminal.innerHTML += nextChar;
        playTypeSound();
        charIndex++;
        terminal.scrollTop = terminal.scrollHeight; // Auto scroll to bottom
        setTimeout(typeChar, typingSpeed);
      } else {
        terminal.innerHTML += "\n\nPress Enter to continue...\n";

        isTyping = false;
        charIndex = 0;
        terminal.scrollTop = terminal.scrollHeight;
        if (callback) callback();
      }
    }

    typeChar();
  }

  function playTypeSound() {
    const soundClone = typeSound.cloneNode();
    soundClone.volume = 0.07;
    soundClone.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  }

  function onEnterPress(event) {
    if (event.key === "Enter" && !isTyping) {
      document.removeEventListener("keydown", onEnterPress);
      terminal.innerHTML += "\n";
      if (messageIndex < messages.length) {
        const currentMessage = messages[messageIndex];
        switch (currentMessage.type) {
          case "message":
            typeMessage(currentMessage.content, () => {
              messageIndex++;
              document.addEventListener("keydown", onEnterPress);
            });
            break;

          case "input":
            promptInput(currentMessage.content, currentMessage.handler);
            break;

          case "ascii":
            // Append ASCII art instantly
            terminal.innerHTML += `\n${currentMessage.content}\n`;
            messageIndex++;
            document.addEventListener("keydown", onEnterPress);
            break;

          default:
            console.warn(`Unknown message type: ${currentMessage.type}`);
            messageIndex++;
            document.addEventListener("keydown", onEnterPress);
        }
      } else {
        // All messages have been displayed
        // Optionally, add a final action here
        // For example, clearing the terminal or redirecting the user
      }
    }
  }

  // Function to prompt user input
  function promptInput(question, handler) {
    isTyping = true;
    terminal.innerHTML += question + "\n> "; // Prompt symbol
    let userInput = "";

    function onKeyPress(event) {
      if (event.key === "Enter") {
        terminal.innerHTML += "\n";
        document.removeEventListener("keydown", onKeyPress);
        isTyping = false;

        const response = handler(userInput);
        if (response && response.type === "message") {
          typeMessage(response.content, () => {
            messageIndex++;
            document.addEventListener("keydown", onEnterPress);
          });
        } else {
          messageIndex++;
          document.addEventListener("keydown", onEnterPress);
        }
      } else if (event.key === "Backspace") {
        if (userInput.length > 0) {
          userInput = userInput.slice(0, -1);
          terminal.innerHTML = terminal.innerHTML.slice(0, -1);
        }
      } else if (event.key.length === 1) {
        userInput += event.key;
        terminal.innerHTML += event.key;
      }
      terminal.scrollTop = terminal.scrollHeight;
    }

    document.addEventListener("keydown", onKeyPress);
  }

  // Start typing the first message
  typeMessage(messages[messageIndex].content, () => {
    messageIndex++;
    document.addEventListener("keydown", onEnterPress);
  });
});
