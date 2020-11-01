function lindenmayer(string) {
  let outputstring = ''; // start a blank output string

  // iterate through 'therules' looking for symbol matches:
  for (let symbol of string) {
    //let ismatch = 0; // by default, no match
    for (let [axiom, rule] of rules.entries()) {
      if (symbol == axiom) {
        outputstring += rule; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
      // if nothing matches, just copy the symbol over.
      //if (ismatch == 0) 
      else outputstring += symbol;
    }
  }
  return outputstring; // send out the modified string
}