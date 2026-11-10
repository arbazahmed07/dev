3. GitOps & Argo CD
Aim: Deploy an application automatically using GitOps and Argo CD.
1. What is GitOps?
GitOps is a method of managing applications using Git repositories.
- Store Kubernetes YAML files in GitHub.
- Argo CD monitors the Git repository.
- It automatically synchronizes changes with Kubernetes.
2. Install Argo CD
Step 1: Create namespace
kubectl create namespace argocd

Step 2: Install Argo CD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

Step 3: Check pods
kubectl get pods -n argocd

Step 4: Access Argo CD
kubectl port-forward svc/argocd-server -n argocd 8080:443

Open browser:
https://localhost:8080

3. Create Argo CD Application
Create app.yaml.

apiVersion: argoproj.io/v1alpha1
kind: Application

metadata:
  name: guestbook
  namespace: argocd

spec:
  project: default

  source:
    repoURL: https://github.com/argoproj/argocd-example-apps.git
    targetRevision: HEAD
    path: guestbook

  destination:
    server: https://kubernetes.default.svc
    namespace: default

  syncPolicy:
    automated:
      prune: true
      selfHeal: true

Step 5: Apply application
kubectl apply -f app.yaml

Step 6: Check application
kubectl get applications -n argocd

(Expected output)

Application appears in the Argo CD dashboard and synchronizes with Kubernetes.

Advantages of GitOps:
- Automatic deployment.
- Version control.
- Easy rollback.
- Better monitoring.