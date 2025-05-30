{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "initial_id",
   "metadata": {
    "collapsed": true
   },
   "outputs": [],
   "source": [
    "-- La base de datos 'usuarios' ya se crea automáticamente por las variables de entorno\n",
    "-- Crear la base de datos 'portugues'\n",
    "CREATE DATABASE IF NOT EXISTS portugues;\n",
    "\n",
    "-- Asignar permisos al usuario 'dani' para la nueva base de datos\n",
    "GRANT ALL PRIVILEGES ON portugues.* TO 'dani'@'%';\n",
    "\n",
    "-- Aplicar los cambios de permisos\n",
    "FLUSH PRIVILEGES;"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 2
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython2",
   "version": "2.7.6"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
