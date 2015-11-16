# prism-lite

What
----
Monkeypatch on PrismJS fixing performance issues when dealing with big files (150MB+/300k+ LOC).

Why
---
I found that Prism was struggling with a bunch of big log files I was trying to parse. So I simplified the way it tokenizes regexes.

How
---
Just include the patch file after prism. That's it !

```
<html>
<head>
</head>
<body>
<script src="prism.js"></script>
<script src="prism-patch.js"></script>
<!-- Prism plugins -->
</body>
</html>
```

Why not ?
---------
I really wanted to keep it simple (and it wasn't needed in my case) so lookbehind rules won't work.


MIT license. Do what you want with that.
