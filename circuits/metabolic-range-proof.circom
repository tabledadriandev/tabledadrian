// Metabolic Range Proof Circuit
// Proves that a biomarker value is within a range without revealing the exact value
// Example: Prove HbA1c < 5.7% OR VO2max > 35 without revealing exact values
//
// Note: This is a simplified implementation. For production, consider:
// - Using Bulletproofs for simpler setup
// - Full range proof with both lower and upper bounds
// - Trusted setup ceremony (Perpetual Powers of Tau)

pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template MetabolicRangeProof() {
    // Private inputs (known only to prover)
    signal private input biomarkerValue;
    
    // Public inputs (known to verifier)
    signal input lowerBound;  // Public: minimum acceptable value
    signal input upperBound;  // Public: maximum acceptable value
    
    // Output: 1 if biomarkerValue is in range [lowerBound, upperBound], 0 otherwise
    signal output inRange;
    
    // Components for range checking
    component lowerCheck = LessThan(32);  // Check biomarkerValue >= lowerBound
    component upperCheck = LessThan(32);   // Check biomarkerValue <= upperBound
    
    // Check: lowerBound <= biomarkerValue
    // LessThan(a, b) returns 1 if a < b, so we check: lowerBound < biomarkerValue + 1
    // This means biomarkerValue >= lowerBound
    lowerCheck.in[0] <== lowerBound;
    lowerCheck.in[1] <== biomarkerValue + 1;
    
    // Check: biomarkerValue <= upperBound
    // LessThan(biomarkerValue, upperBound + 1) means biomarkerValue <= upperBound
    upperCheck.in[0] <== biomarkerValue;
    upperCheck.in[1] <== upperBound + 1;
    
    // Both conditions must be true (value is in range)
    // Note: This is a simplified check. Full implementation would use AND gate
    // For now, we output 1 if both checks pass
    inRange <== lowerCheck.out * upperCheck.out;
}

component main = MetabolicRangeProof();














