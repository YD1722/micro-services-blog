eval $(minikube -p minikube docker-env)

cd client
docker build -t blog/client .

cd ../posts
docker build -t blog/post .

cd ../query
docker build -t blog/query .

cd ../event-bus
docker build -t blog/event-bus

cd ../comments
docker build -t blog/comment .

cd ../comment-moderation
docker build -t blog/comment-mod .

cd ../

docker images


