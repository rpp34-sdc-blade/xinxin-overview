const prodcutSchema = new Schema({
  _id:  Number,
  campus: String,
  name:   String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  features: [{ feature: String, value: String }],
  styles: [{type: Number, ref: 'Style'}]
});

const styleSchema = new Schema({
  _id: Number,
  product_id: {type: Number, ref: 'Product'},
  name: String,
  original_price: String,
  sale_price: String,
  "default?": Boolean,
  photos: [{type: Schema.Types.ObjectId, ref: 'Photo'}],
  skus: [{type: Number, ref: 'Sku'}]
})

const photoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  thumbnail_url: String,
  url: String
})

const skuSchema = new Schema({
  _id: Number,
  quantity: Number,
  size: String
})

const Product = mongoose.model('Product', productSchema);
const Style = mongoose.model('Style', styleSchema);
const Photo = mongoose.model('Photo', photoSchema);
const Sku = mongoose.model('Sku', skuSchema);


