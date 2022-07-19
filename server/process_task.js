const asyncTimeout = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

async function processTask (description, duration) {
    console.log(`Description: ${description}`);
    console.log(`Duration: ${duration}`);
    await asyncTimeout(duration);
    return description;
}

module.exports = {processTask};