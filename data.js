export const items = [
  { id: 1, name: 'Clean Code', category: 'Tech', price: 450, stock: 5 },
  { id: 2, name: 'Atomic Habits', category: 'Self-help', price: 380, stock: 0 },
  { id: 3, name: 'Sapiens', category: 'History', price: 520, stock: 8 },
  { id: 4, name: 'Deep Work', category: 'Self-help', price: 410, stock: 3 },
  { id: 5, name: "You Don't Know JS", category: 'Tech', price: 600, stock: 2 },
];
export const categories = ['Tech', 'Self-help', 'History'];

export function fakeApi(data, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('API request failed'));
      } else {
        resolve(data);
      }
    }, ms);
  });
}
