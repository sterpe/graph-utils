'use strict'

module.exports = function Edge (weight, source, target, data = null) {
  this.weight = weight
  this.source = source
  this.target = target
  this._ = data
}
