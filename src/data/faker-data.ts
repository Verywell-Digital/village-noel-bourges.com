import { faker } from "@faker-js/faker";


function generateImageUrl() {
  return faker.image.urlPlaceholder({ backgroundColor: 'e8e8e8', textColor: 'ffffff', width: 1400, height: 800, text: '', format: 'png' });
}


export function getImages(count: number): any[] {
  const images = [];
  for (let i = 0; i < count; i++) {
    const image = {
      url: generateImageUrl(),
    };
    images.push(image);
  }
  return images;
}

export function getExhibitors(count: number): any[] {
  const categories = Array.from({ length: 3 }, () =>
    faker.commerce.department()
  );
  const subCategories = Array.from({ length: 5 }, () =>
    faker.commerce.productName()
  );

  const exhibitors = [];
  for (let i = 0; i < count; i++) {
    const exhibitor = {
      title: faker.lorem.words(5),
      description: faker.lorem.text(),
      tagTitle: faker.lorem.word(4),
      image: generateImageUrl(),
      category: {
        name: categories[Math.floor(Math.random() * categories.length)], // Sélectionner une catégorie au hasard
        subCategory: {
          name: subCategories[Math.floor(Math.random() * subCategories.length)], // Sélectionner une sous-catégorie au hasard
        },
      },
    };
    exhibitors.push(exhibitor);
  }
  return exhibitors;
}

export function getAnimations(count: number): any[] {
  const positions = ["left", "right", "center"]; // Array of possible positions
  const animations = [];
  for (let i = 0; i < count; i++) {
    const animation = {
      position: positions[i % positions.length], // Cycle through positions array
      title: faker.lorem.words(2),
      description: faker.lorem.paragraph(),
      medias: faker.helpers.arrayElements([faker.image.urlPlaceholder({ backgroundColor: '2d2d2d', textColor: 'ffffff', width: 600, height: 400, text: 'Placeholder' })], {
        min: 1,
        max: 1,
      }),
      image: generateImageUrl(),
      date: faker.date.future(),
      lieu: faker.lorem.word(),
    };
    animations.push(animation);
  }
  return animations;
}

export function getMedias(count: number): any[] {
  const categories = ["Visuel", "Dossier de presse", "Communiqué de presse"];
  const media = [];
  for (let i = 0; i < count; i++) {
    const mediadata = {
      title: faker.lorem.words(2),
      medias: faker.helpers.arrayElements([faker.image.urlPlaceholder({ backgroundColor: '2d2d2d', textColor: 'ffffff', width: 600, height: 400, text: 'Placeholder' })], {
        min: 1,
        max: 1,
      }),
      image: generateImageUrl(),
      date: faker.date.future().toISOString().slice(0, 10),
      category: {
        name: categories[Math.floor(Math.random() * categories.length)],
      },
    };
    media.push(mediadata);
  }
  return media;
}

export function getRestaurants(count: number): any[] {
  const positions = ["left", "right", "center"]; // Array of possible positions
  const restaurants = [];
  for (let i = 0; i < count; i++) {
    const restaurant = {
      position: positions[i % positions.length], // Cycle through positions array
      title: faker.lorem.words(2),
      description: faker.lorem.paragraph(),
      medias: faker.helpers.arrayElements(
        [
          generateImageUrl(),
          generateImageUrl(),
          generateImageUrl(),
          generateImageUrl(),
        ],
        { min: 3, max: 3 }
      ),
    };
    restaurants.push(restaurant);
  }
  return restaurants;
}
