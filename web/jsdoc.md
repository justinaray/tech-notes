# Gotchas

* You need a recent version to work with es2015 classes (>= 3.4.0)
* You must provided the full list of source files. It won't find them via doc linkage
* The code hierarchy means very little.  In some cases, membership can be inferred, but in many instances, you need to be explicit.
* You must pay attention to the namepaths.  ~ !== # !== #
** ~ - inner member 
** # - instance member 
** . - static member
** Inline Class exports do not seem to work well.
** You should explicitly export the class definition later in the file.  Reference it via module:my/module~MyClass
* Everything that you want to be documented must be proceeded with a jsdoc comment
** If you miss one, the type might still get defined, but it won't be included in hierarcy
** Ex: module -> class def -> constructor -> @name (property)
 

# Nice Features

* If you specify a README or MD file, it will fill in the Home/index page with this content
