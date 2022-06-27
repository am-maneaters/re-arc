type ValidFunction<
  Arguments extends unknown[],
  ReturnType
> = unknown[] extends Arguments
  ? unknown extends ReturnType
    ? never
    : (...args: Arguments) => ReturnType
  : (...args: Arguments) => ReturnType;

// This type allows us to get all the possible parameters of a function that has many overloads
export type Overloads<T extends (...args: unknown[]) => unknown> = T extends {
  (...args: infer A1): infer R1;
  (...args: infer A2): infer R2;
  (...args: infer A3): infer R3;
  (...args: infer A4): infer R4;
  (...args: infer A5): infer R5;
  (...args: infer A6): infer R6;
  (...args: infer A7): infer R7;
  (...args: infer A8): infer R8;
  (...args: infer A9): infer R9;
  (...args: infer A10): infer R10;
  (...args: infer A11): infer R11;
  (...args: infer A12): infer R12;
  (...args: infer A13): infer R13;
  (...args: infer A14): infer R14;
  (...args: infer A15): infer R15;
  (...args: infer A16): infer R16;
  (...args: infer A17): infer R17;
  (...args: infer A18): infer R18;
  (...args: infer A19): infer R19;
  (...args: infer A20): infer R20;
  (...args: infer A21): infer R21;
  (...args: infer A22): infer R22;
  (...args: infer A23): infer R23;
  (...args: infer A24): infer R24;
  (...args: infer A25): infer R25;
  (...args: infer A26): infer R26;
  (...args: infer A27): infer R27;
  (...args: infer A28): infer R28;
  (...args: infer A29): infer R29;
  (...args: infer A30): infer R30;
  (...args: infer A31): infer R31;
  (...args: infer A32): infer R32;
}
  ?
      | ValidFunction<A1, R1>
      | ValidFunction<A2, R2>
      | ValidFunction<A3, R3>
      | ValidFunction<A4, R4>
      | ValidFunction<A5, R5>
      | ValidFunction<A6, R6>
      | ValidFunction<A7, R7>
      | ValidFunction<A8, R8>
      | ValidFunction<A9, R9>
      | ValidFunction<A10, R10>
      | ValidFunction<A11, R11>
      | ValidFunction<A12, R12>
      | ValidFunction<A13, R13>
      | ValidFunction<A14, R14>
      | ValidFunction<A15, R15>
      | ValidFunction<A16, R16>
      | ValidFunction<A17, R17>
      | ValidFunction<A18, R18>
      | ValidFunction<A19, R19>
      | ValidFunction<A20, R20>
      | ValidFunction<A21, R21>
      | ValidFunction<A22, R22>
      | ValidFunction<A23, R23>
      | ValidFunction<A24, R24>
      | ValidFunction<A25, R25>
      | ValidFunction<A26, R26>
      | ValidFunction<A27, R27>
      | ValidFunction<A28, R28>
      | ValidFunction<A29, R29>
      | ValidFunction<A30, R30>
      | ValidFunction<A31, R31>
      | ValidFunction<A32, R32>
  : never;
