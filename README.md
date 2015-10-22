Fullstack-workshop
==================

```
http GET localhost:3200/fibonacci # random iterations
http GET localhost:3200/fibonacci?iterations=1000000000\&force=yes # high cpu
http GET localhost:3200/memoryleak
http GET localhost:3200/memoryleak?interval=400 #Fails after ~500mb rss use
http GET localhost:3200/timeout?timeout=100 #success
http GET localhost:3200/timeout #fail after 2s (default)
```

[Api](./doc/index.html)

