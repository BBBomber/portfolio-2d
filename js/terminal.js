document.addEventListener("DOMContentLoaded", function () {
  const terminal = document.getElementById("terminal");

  // Define the messages and interaction flow
  const messages = [
    {
      type: "message",
      content: "Yashasvi's Portfolio/Resume website, [All rights reserved]",
    },
    {
      type: "message",
      content: "I've been working as a Game Developer since 2022 now.",
    },
    {
      type: "message",
      content:
        "But more importantly, you can CLICK ON THE WEIRD BACKGROUND to make it weirder.",
    },
    {
      type: "input",
      content: "Type 'help' to learn more about Conway's Game of Life.",
      handler: function (input) {
        if (input.toLowerCase() === "help") {
          return {
            type: "message",
            content:
              "Conway's Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970.\n in simple words it's a game where cells live, die, or reproduce based on a few rules, creating pretty cool patterns.",
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
        "The control panel to the right should help you out if you wanna play the game. \nI recommend hiding everything.",
    },
    {
      type: "message",
      content: "That is all for now, feel free to look around, tata.",
    },
    {
      type: "message",
      content: "........ \n... \nare you that bored..",
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

  function onEnterPress(event) {
    if (event.key === "Enter" && !isTyping) {
      document.removeEventListener("keydown", onEnterPress);
      terminal.innerHTML += "\n";
      if (messageIndex < messages.length) {
        const currentMessage = messages[messageIndex];
        if (currentMessage.type === "message") {
          typeMessage(currentMessage.content, () => {
            messageIndex++;
            document.addEventListener("keydown", onEnterPress);
          });
        } else if (currentMessage.type === "input") {
          promptInput(currentMessage.content, currentMessage.handler);
        }
      } else {
        // All messages have been displayed
        terminal.innerHTML += "\nEnd of messages.\n";
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
