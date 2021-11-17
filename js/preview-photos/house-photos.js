const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#images');
const previewHousePhotos = document.querySelector('.ad-form__photo');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (previewHousePhotos.children[0]) {
      previewHousePhotos.children[0].remove();
    }
    const newImage = document.createElement('img');
    newImage.src = URL.createObjectURL(file);
    previewHousePhotos.appendChild(newImage);
  }
});


export {previewHousePhotos};
