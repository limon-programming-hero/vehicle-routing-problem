class population {
  constructor(popSize, crossoverRa, mutationRa) {
    this.popSize = popSize;
    this.crossoverRa = crossoverRa;
    this.mutationRa = mutationRa;
    this.membersOfPop = [];
    this.popArry;
    this.pool = [];
  }
  // here all the membersOfPop gene's total distance or fitness function is calculated
  calcFitness(tab) {
    console.log(this.membersOfPop);
    for (let i = 0; i < this.membersOfPop.length; i++) {
      this.membersOfPop[i].calcFitness(tab);
    }
  }
  // rearranging the membersOfPop array in ascending order based on fitness values.
  // done
  orderPop() {
    var orderTab = newTab(this.membersOfPop);   // creating a duplicate of memebersOfPop
    var tab = [];
    let index;
    // console.log({ orderTab });
    while (orderTab.length > 0) {
      let fit = 0;
      for (let i = 0; i < orderTab.length; i++) {
        if (orderTab[i].fitness > fit) {
          fit = orderTab[i].fitness;
          index = i;
        }
      }

      tab.push(orderTab[index]);
      removeElement(orderTab, index);
    }
    this.membersOfPop = tab.reverse();
    console.log({ membersOfPop: this.membersOfPop })
  }
  // mainly declare the value of pool;
  // done
  naturalSelection() {
    this.pool = newTab(this.membersOfPop).splice(
      0,
      this.membersOfPop.length * this.crossoverRa
    );     // getting crossoverRa % of best fittest membersOfPop
    this.membersOfPop = newTab(this.membersOfPop).splice(0, this.popSize); //just keeping most fitted pop size numbers of solutions
  }

  // selecting all the pool members (best fitness solutions) and randomly doing crossover between one solution with another.By crossover from two parents, we will get 1 offspring.
  // done 
  crossover() {
    let x,
      y,
      tab = [];

    console.log({ pool: this.pool })
    while (this.pool.length > 0) {
      //choosing Parent randomly
      x = parseInt(Math.random() * this.pool.length);
      y = parseInt(Math.random() * this.pool.length);
      //y = parseInt(Math.random() * this.pool.length);

      while (x == y) {
        y = parseInt(Math.random() * this.pool.length);
      }

      let parent1 = prepareChrom(this.pool[x].dna);
      let parent2 = prepareChrom(this.pool[y].dna);
      console.log(x, y)
      //CROSSOVER PARENT1 X PARENT2
      let randomPoint = parseInt(Math.random() * parent1.length);
      // let randomPoint = parseInt(parent1.length / 2);

      tab = parent1.slice(0, randomPoint);
      tab = tab.concat(parent2.slice(randomPoint));
      tab = tab.concat(parent1.slice(randomPoint));
      tab = tab.concat(parent2.slice(0, randomPoint));
      removeRepeate(tab);

      children.push(tab);

      removeElement(this.pool, x);
      if (y == 0) {
        removeElement(this.pool, y);
      } else {
        removeElement(this.pool, y - 1);
      }
      // todo: add this if the previous command shows some error
      // as after removing x from the pool ,pool length will be decreased and so, the elements will reduce it's index
      // if (y < x) {
      //   removeElement(this.pool, y); //here removing x from pool will not effect
      // } else {
      //   removeElement(this.pool, y - 1); //here removing x from pool will will effect and so index will reduce by 1
      // }

      if (this.pool.length == 1) break;
    }
  }

  // doing mutation and making the routes for each children set and all calculating the fitness function
  // done
  mutation() {
    let dna;
    console.log({ children })
    for (let i = 0; i < children.length; i++) {
      dna = mutate(children[i]); //mutation done here
      let child = new genes(dna, 1); // making solution routes set

      child.calcFitness(customersDistance); // calculating fitness function
      //  console.log(child)
      pop.membersOfPop.push(child); // adding new solution array to the membersOfPop array and here elitism is done
    }
  }
}

/*************************************** */

//   *********/////////////////////////

//prepare dna for crossover and mutation
// returning an array of all the customer points serially based on the routes 
// done 
function prepareChrom(tab) {
  let chrom = [];
  for (let i = 0; i < tab.length; i++) {
    for (let j = 1; j < tab[i].length - 1; j++) {
      chrom.push(tab[i][j]);
    }
  }
  return chrom;
}

// mutation is done here according to mutation rate
function mutate(tab) {
  let c;
  for (let i = 0; i < tab.length / 2; i++) {
    if (Math.random() < mutationRate) {
      let x = parseInt(Math.random() * tab.length);
      let y = parseInt(Math.random() * tab.length);
      c = tab[x];
      tab[x] = tab[y];
      tab[y] = c;
    }
  }
  return tab;
}