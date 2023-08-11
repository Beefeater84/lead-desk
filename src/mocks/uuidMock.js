let counter = 0;

export default function generateUUIDMock() {
  counter += 1;
  return `mocked-uuid-${counter}`;
}
