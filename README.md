# HARIKAFLIX Birthday Surprise

A cinematic Netflix-inspired birthday website celebrating a childhood friendship. This project is a lightweight static website built with HTML, CSS, and vanilla JavaScript. It is easy to customize and can be deployed on Vercel.

## 1. Open project in VS Code

1. Open VS Code.
2. Choose File > Open Folder.
3. Select the folder `birthday-bestflix`.
4. Open the project in the Explorer panel.
5. Use Live Server or run a local static server from the terminal.

## 2. Add your friend's photographs

Place your images in the `assets/photos` folder. The project currently expects the following files:

- `assets/photos/her-portrait.jpg`
- `assets/photos/photo-1.jpg`
- `assets/photos/photo-2.jpg`
- `assets/photos/photo-3.jpg`
- `assets/photos/photo-4.jpg`
- `assets/photos/photo-5.jpg`

If a photo is missing, the page automatically swaps in a styled placeholder so the site still looks complete.

## 3. Customize her name

Open `index.html` and find the profile card text:

- `Her Name`
- `Birthday Star`

Replace those values with your friend's actual name and preferred label.

## 4. Edit the birthday letter

Open `index.html` and update the paragraph text inside the `letter-body` section. The main message is already written, and you can personalize it anytime.

## 5. Add your real childhood memories

Open `index.html` and edit the four memory cards in the `#memories` section. Each card includes a short preview and a hidden full message. Replace the placeholder text with your own genuine childhood memories, jokes, and stories.

## 6. Preview the website locally

From the project folder, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## 7. Upload to GitHub

1. Create a new GitHub repository.
2. Initialize git in the project folder.
3. Add all files to git.
4. Commit the project.
5. Push to your GitHub repository.

Example commands:

```bash
git init
git add .
git commit -m "Initial birthday surprise website"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

## 8. Deploy on Vercel

1. Sign in to Vercel.
2. Click New Project.
3. Import your GitHub repository.
4. Choose the root folder of the project.
5. Keep the default settings for a static site.
6. Click Deploy.

This site uses no backend, no API keys, and no environment variables, so deployment is straightforward.

## 9. Optional music

The project includes a music toggle button and an optional `assets/music/background-music.mp3` file slot. The music is not set to autoplay and is controlled by the on-page button. Replace the file with your own track if you want a custom audio background.

## 10. Customization tips

- Update the hero text in `index.html`.
- Change brand colors in `style.css`.
- Replace placeholder images in the `assets/photos` folder.
- Adjust timings and motion in `style.css` if needed.

## License

This project is intended for personal use and celebration.
