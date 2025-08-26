import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ArrowRight, ChevronRight } from "lucide-react"

const products = [
    {
        id: 1,
        name: "Feeds",
        image: "/white-bottle-with-purple-cap.png",
        rrp: "KES 2,000",
        availability: "2 available",
        status: "Low Stock",
    },
    {
        id: 2,
        name: "Fertiliser",
        image: "/white-bottle-with-purple-cap.png",
        rrp: "KES 2,000",
        availability: "2 available",
        status: "Low Stock",
    },
    {
        id: 3,
        name: "Feeds",
        image: "/white-bottle-with-purple-cap.png",
        rrp: "KES 2,000",
        availability: "2 available",
        status: "Low Stock",
    },
]

export function ProductsGrid() {
    return (
        <div className="w-full mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">All Products</h2>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                        See All
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
                <Button className="bg-black hover:bg-gray-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Product
                </Button>
            </div>

            {/* Products Grid */}
            <div className="flex items-center gap-4">
                <div className="grid grid-cols-3 gap-4 flex-1">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            {/* Product Image */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-24 h-24 object-contain"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="space-y-2">
                                <h3 className="font-medium text-gray-900">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.availability}</p>

                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <span className="text-gray-500">RRP</span>
                                        <span className="ml-2 font-medium text-gray-900">{product.rrp}</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-black text-white hover:bg-gray-800">
                                        {product.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrow */}
                <Button variant="outline" size="icon" className="flex-shrink-0 border-gray-300 hover:bg-gray-50 bg-transparent">
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
