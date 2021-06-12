cd config/k8 || exit

kubectl apply -f client-depl.yaml
kubectl apply -f posts-depl.yaml
kubectl apply -f comments-depl.yaml
kubectl apply -f comment-mod-depl.yaml
kubectl apply -f query-depl.yaml
kubectl apply -f event-bus-depl.yaml
kubectl apply -f ingress-srv.yaml

kubectl rollout restart deployments client-depl
kubectl rollout restart deployments posts-depl
kubectl rollout restart deployments comments-depl
kubectl rollout restart deployments comment-mod-depl
kubectl rollout restart deployments query-depl
kubectl rollout restart deployments event-bus-depl



