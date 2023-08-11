export function validateName(name: string): boolean {
  return name.length > 0 && name.length <= 100;
}

export function validateAmount(amount: number): boolean {
  return amount >= 0 && amount <= 10000;
}
