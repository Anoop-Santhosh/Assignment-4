// DOM element references
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// Story components
const storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';
const insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
const insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
const insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

// selection function
function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Event listener
randomize.addEventListener('click', generateStory);

function generateStory() {
    // Create new story
    let newStory = storyText;
    
    // Get random elements
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);
    
    // Replace placeholders
    newStory = newStory.replace(/:insertx:/g, xItem);
    newStory = newStory.replace(/:inserty:/g, yItem);
    newStory = newStory.replace(/:insertz:/g, zItem);
    
    // Replace name if custom name exists
    if (customName.value.trim() !== '') {
        newStory = newStory.replace(/Bob/g, customName.value.trim());
    }
    
    // Convert to UK units if selected
    if (document.getElementById('uk').checked) {
        const weight = Math.round(300 * 0.0714286) + ' stone';
        const temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade';
        newStory = newStory.replace('94 fahrenheit', temperature);
        newStory = newStory.replace('300 pounds', weight);
    }
    
    // Display the story
    story.textContent = newStory;
    story.style.visibility = 'visible';
}
