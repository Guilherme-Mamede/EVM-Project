let yourVoteGoesTo = document.querySelector('.d-1-1 span');
let post = document.querySelector('.d-1-2');
let description = document.querySelector('.d-1-4');
let warning = document.querySelector('.d-2');
let sideway = document.querySelector('.d-1-right')
let numbers = document.querySelector('.d-1-3')

let actualStep = 0;
let number = '';
let blankVote = false;
let votes = [];

function startStep() {
  let step = steps[actualStep]
  
  let numbersHtml = '';
  number = '';
  blankVote = false;

  for(let i = 0 ; i < step.numbers ; i++){
    if(i === 0) {
    numbersHtml += `<div class="number flashing"></div>`
    } else {
      numbersHtml += `<div class="number"></div>`
    }
  }

  yourVoteGoesTo.style.display = 'none';
  post.innerHTML = step.title;
  description.innerHTML = '';
  warning.style.display = 'none'
  sideway.innerHTML = '';
  numbers.innerHTML = numbersHtml;

}

function updateInterface(){
  let step = steps[actualStep];
  let candidate = step.candidates.filter((item)=>{
    if(item.number === number){
      return true;
    } else {
      return false;
    }
  })
  if(candidate.length > 0) {
    candidate = candidate[0];
    yourVoteGoesTo.style.display = 'block';
    warning.style.display = 'block';
    description.innerHTML = `Name: ${candidate.name}<br/> Party: ${candidate.party}`
    
    let photosHtml = '';
    for(let i in candidate.photos) {
      if(candidate.photos[i].small){
          photosHtml += `<div class="d-1-image small"> <img src="images/${candidate.photos[i].url}" alt=""> ${candidate.photos[i].subtitle}</div>`
      } else {
            photosHtml += `<div class="d-1-image"> <img src="images/${candidate.photos[i].url}" alt=""> ${candidate.photos[i].subtitle}</div>`
      }
    }

    sideway.innerHTML = photosHtml;
  } else {
    yourVoteGoesTo.style.display = 'block'
    warning.style.display = 'block';
    description.innerHTML = `<div class="big-warn flashing">NULL VOTE</div>`
  }
}


function clicked(n) {
  let theNumber = document.querySelector('.number.flashing')
  if(theNumber !== null) {
    theNumber.innerHTML = n;
    number = `${number}${n}`;

    theNumber.classList.remove('flashing')
    if(theNumber.nextElementSibling !== null){
      theNumber.nextElementSibling.classList.add('flashing')    
    } else {
      updateInterface();
    }
  }
}

function blank() {
    number = '';
    blankVote = true;
    yourVoteGoesTo.style.display = 'block';
    warning.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = `<div class="big-warn-blank flashing">BLANK VOTE</div>`;
    sideway.innerHTML = '';
}

function correct() {
  startStep();
}

function confirm() {
  let step = steps[actualStep];

  let confirmedVote = false;

  if(blankVote === true) {
    confirmedVote = true;
    votes.push({
      step: steps[actualStep].title,
      vote: 'blank'
    })
  }else if(number.length === step.numbers) {
    confirmedVote = true;
    votes.push({
      step: steps[actualStep].title,
      vote: number
    })
  }

  if(confirmedVote) {
    actualStep++;
    if(steps[actualStep] !== undefined) {
      startStep();
    } else {
      document.querySelector('.screen').innerHTML = `<div class="massive-warn flashing">FIM!</div>`
      console.log(votes)
    }
  }
}

startStep()