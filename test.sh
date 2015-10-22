http GET localhost:3200
http GET localhost:3200/fibonacci # random iterations
http GET localhost:3200/fibonacci?iterations=10 # high cpu
http GET localhost:3200/fibonacci?iterations=79 # high cpu
http GET localhost:3200/memoryleak?interval=0 #Fails after ~500mb rss use
http GET localhost:3200/timeout?timeout=100 #success
http GET localhost:3200/timeout #fail after 2s (default)
