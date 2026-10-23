Q1. Create Git Repository
mkdir myproject
cd myproject
git init
echo "Hello Git" > file.txt
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/myproject.git
git push -u origin main


Q2. Create and Push File
echo "Local file" > local.txt
git add local.txt
git commit -m "Add file"
git push origin main


Q3. Pull File from GitHub
git pull origin main


Q4. Create File in Main
git switch main
echo "Main file" > main.txt
git add main.txt
git commit -m "Add main file"


Q5. Create File in Branch-1
git switch -c branch-1
echo "Branch file" > branch1.txt
git add branch1.txt
git commit -m "Add branch file"


Q6. Merge and Push
git switch main
git merge branch-1
git push origin main