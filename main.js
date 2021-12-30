// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (num,dna) => {
    return {
      specimenNum: num,
      dna:dna,
      mutate: function () {
        let randomPosition = Math.floor(Math.random() * 15);
        let baseBefore = this.dna[randomPosition];
        let baseAfter; 
        do {
          baseAfter = returnRandBase();
          } while (baseBefore === baseAfter);
          this.dna[randomPosition] = baseAfter;
        return this.dna;
      },
      compareDNA: function (otherPAequor) {
        let baseInCommon = 0;
        for (let i = 0; i < this.dna.length; i++){
          if (this.dna[i] === otherPAequor.dna[i]) {
            baseInCommon++;
          }
        }
        let percentCoincident = (baseInCommon / this.dna.length * 100).toFixed(2);
        console.log (`specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${percentCoincident}% DNA in common.`)
      },

// as the task 5 required no return, just a console.log, 
// i've created another version of compareDNA for returning 
// only the percentual to attend task 9
      compareDNA2: function (anotherPAequor) {
        let baseInCommon = 0;
        for (let i = 0; i < this.dna.length; i++){
          if (this.dna[i] === anotherPAequor.dna[i]) {
            baseInCommon++;
          }
        }
        let percentCoincident = (baseInCommon / this.dna.length * 100).toFixed(2);
        return percentCoincident;
      },

      willLikelySurvive: function () {
        let oddsOnSurvive = 0; 
        for (let i = 0; i < this.dna.length; i++){
          if (this.dna[i] === 'G' || this.dna[i] === 'C') {
            oddsOnSurvive++;
          }
        }
        if ((oddsOnSurvive / this.dna.length * 100) >= 60) {
          return true;
        } else {
          return false}
      },
      complementStrand: function (strand1 = this.dna) {
        let strand2 = [];
        for (let i = 0; i < strand1.length; i++){
          switch (strand1[i]) {
            case 'A':
              strand2.push ('T');
              break;
            case 'T':
              strand2.push ('A');
              break;
            case 'C':
              strand2.push ('G');
              break;
            case 'G':
              strand2.push ('C');
              break;
          }
        }
        return strand2;
      }
    }
  }

function findMostRelated (arrSpecimens) {
  let mostRelated = [];
  //let test = []
  for (let i = 0; i < arrSpecimens.length; i++){
    let greaterPercent = 0;
    let specimenNumA = '';
    let specimenNumB = '';
    let dnaA = '';
    let dnaB = '';
    for (let j = 0; j < arrSpecimens.length; j++){
      if (i !== j) {
        let percent = parseFloat(arrSpecimens[i].compareDNA2(arrSpecimens[j]));
        if (percent > greaterPercent){
          greaterPercent = percent;
          specimenNumA = arrSpecimens[i].specimenNum;
          specimenNumB = arrSpecimens[j].specimenNum;
          dnaA = arrSpecimens[i].dna;
          dnaB = arrSpecimens[j].dna;
        }
      }
    }
      //test.push([specimenNumA,specimenNumB,dnaA,dnaB,greaterPercent]);
      mostRelated.push([specimenNumA,specimenNumB,greaterPercent]);
  }
  //console.log(test);
  let maxPercent = 0;
  let mostPercentOfMostRelated = [];
  let alreadyInclude = [];
  for (let i = 0; i < mostRelated.length; i++){
    if (parseInt(mostRelated[i][2]) > maxPercent){
      maxPercent = mostRelated[i][2];
    }
  }
  for (let i = 0; i < mostRelated.length; i++) {
    if (mostRelated[i][2] === maxPercent) {
      if (!alreadyInclude.includes(mostRelated[i][0]) || !alreadyInclude.includes(mostRelated[i][1])) { 
        mostPercentOfMostRelated.push([mostRelated[i][0],mostRelated[i][1],mostRelated[i][2]])
        alreadyInclude.push(mostRelated[i][0],mostRelated[i][1]);
      }
    }
  }
  return mostPercentOfMostRelated; // an array of 3 elemnt arrays (specimen, specimen compered, percentual of similarity)
}


// Function to create an array with objects pAequorFactory(). Parameter is the number of objects you want.
function createArrSpec (qtt) { 
  let instancesAequor = [];
  for (let i = 1; instancesAequor.length < qtt; i++) {
    let specimen = pAequorFactory(i, mockUpStrand());
    if (specimen.willLikelySurvive()){
      instancesAequor.push(specimen);
    }
  }
  return instancesAequor;
}



// Reports and tests.

//Create 2 instances of pAquor using pAquorFActory
let specimen1 = pAequorFactory(001, mockUpStrand());
let specimen2 = pAequorFactory(002, mockUpStrand());
console.log (`The specimen number of specimen1 is ${specimen1.specimenNum} of specimen2 is ${specimen2.specimenNum}.`);
console.log (`\nThese DNAs before mutation are\n ${specimen1.dna} \n            and \n ${specimen2.dna}`);

// test .mutate
console.log ('\n--------------------------\n');
console.log (`DNA of specimen${specimen1.specimenNum} before mutation\n${specimen1.dna}`);
console.log ('DNA after mutation\n' + specimen1.mutate());

// Test .compareDNA()
console.log ('\n--------------------------\n');
console.log ('Test .compareDNA()\nAfter mutation, ');
specimen1.compareDNA(specimen2);

// Test .willLikelySurvive()
console.log ('\n--------------------------\n');
console.log (`specimen1 has a chance on survive? ${specimen1.willLikelySurvive()}`);

// Test function createArrSpec(qtt) for creating 30 speciments able to survive
console.log ('\n--------------------------\n');
let specAbleSurv = createArrSpec(30);
console.log ('The specimens created that will likely survive:\n');
for (let i = 0; i < specAbleSurv.length; i++) {
  console.log(`#${specAbleSurv[i].specimenNum}, dna ${specAbleSurv[i].dna}`)
}

// Test chalenge .complementStrand()
console.log ('\n--------------------------\n');
console.log (`The specimen1's dna after mutation is \n${specimen1.dna} \nand its complement strand is \n${specimen1.complementStrand()}`)

// Test chalenge findMostRelated() function
console.log ('\n--------------------------\n');
console.log ('The most related that have the max percentage\n[specimen, specimen compared, percentual of similarty]');
console.log (findMostRelated (specAbleSurv));
 
