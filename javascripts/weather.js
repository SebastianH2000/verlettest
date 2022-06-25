var frontWindDir = 1;
var frontWindSpeed = 1;

function updateFrontWeather() {
    frontWindSpeed = (ImprovedNoise.noise(mainTimer/19,noiseSeed,xOff/73)+1)*2;
    frontWindDir = ImprovedNoise.noise(mainTimer/10,noiseSeed,xOff/100)*frontWindSpeed-2;
}