# Profile Photo Setup Instructions

## Step 1: Save Your Photo
1. Save the profile photo as `ajay-profile.jpg`
2. Place it in the `src/assets/` folder
3. Full path should be: `C:/Users/LENOVO/projects/ai-3d-portfolio/src/assets/ajay-profile.jpg`

## Step 2: Verify File Location
Run this command to check if the file exists:
```
ls "C:/Users/LENOVO/projects/ai-3d-portfolio/src/assets/"
```

## Step 3: Alternative Paths to Try
If the current path doesn't work, try these alternatives in the HTML:

1. `src="./src/assets/ajay-profile.jpg"`
2. `src="/src/assets/ajay-profile.jpg"`
3. `src="src/assets/ajay-profile.jpg"`
4. `src="./assets/ajay-profile.jpg"`

## Step 4: Online Hosting Option
Upload to imgur.com and use the direct link:
`src="https://i.imgur.com/YOUR_IMAGE_ID.jpg"`

## Troubleshooting
- Make sure the file is actually a JPG image, not a text file
- Check that the filename matches exactly (case-sensitive)
- Verify the image is not corrupted
- Try refreshing your browser cache (Ctrl+F5)
