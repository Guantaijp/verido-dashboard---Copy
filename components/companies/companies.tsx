"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Trash2, MoreHorizontal, Download } from "lucide-react"
import {DashboardHeader} from "@/components/facilitator-dashboad/header";

interface Company {
    id: string
    name: string
    location: string
    agents: number
    products: number
    status: "Active" | "Inactive"
}

const companies: Company[] = [
    { id: "1", name: "Company ABC", location: "Kitui, Kenya", agents: 123, products: 123, status: "Active" },
    { id: "2", name: "Company ABC", location: "Kitui, Kenya", agents: 123, products: 123, status: "Inactive" },
    { id: "3", name: "Company ABC", location: "Kitui, Kenya", agents: 123, products: 123, status: "Active" },
    { id: "4", name: "Company ABC", location: "Kitui, Kenya", agents: 123, products: 123, status: "Active" },
    { id: "5", name: "Company ABC", location: "Kitui, Kenya", agents: 123, products: 123, status: "Active" },
    { id: "6", name: "Company ABC", location: "Kitui, Kenya", agents: 123, products: 123, status: "Active" },
    { id: "7", name: "Company ABC", location: "Kitui, Kenya", agents: 123, products: 123, status: "Inactive" },
    { id: "8", name: "Company ABC", location: "Kitui, Kenya", agents: 123, products: 123, status: "Inactive" },
]

export default function CompaniesPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [aiInsights, setAiInsights] = useState(true)

    return (
        <div className="min-h-screen p-6">
            <DashboardHeader/>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold text-gray-900">Companies</h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">AI Insights</span>
                        <button
                            onClick={() => setAiInsights(!aiInsights)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                aiInsights ? "bg-green-600" : "bg-gray-300"
                            }`}
                        >
              <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      aiInsights ? "translate-x-6" : "translate-x-1"
                  }`}
              />
                        </button>
                    </div>
                </div>
            </div>

            {/* Companies Table */}
            <Card className="overflow-hidden border-none rounded-none shadow-none ">
                {/* Table Header */}
                <div className="bg-[#C2C8C0] px-6 py-4 rounded-lg">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                        <div className="col-span-4">Name</div>
                        <div className="col-span-2 text-center">No. of Agents</div>
                        <div className="col-span-2 text-center">No. of Products</div>
                        <div className="col-span-2 text-center">Status</div>
                        <div className="col-span-2"></div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                    {companies.map((company) => (
                        <div key={company.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                {/* Company Info */}
                                <div className="col-span-4 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                        <div className="w-4 h-4 bg-blue-600 rounded-sm transform rotate-45"></div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{company.name}</div>
                                        <div className="text-sm text-gray-500">{company.location}</div>
                                    </div>
                                </div>

                                {/* Agents Count */}
                                <div className="col-span-2 text-center text-gray-900 font-medium">{company.agents}</div>

                                {/* Products Count */}
                                <div className="col-span-2 text-center text-gray-900 font-medium">{company.products}</div>

                                {/* Status */}
                                <div className="col-span-2 flex justify-center">
                                    <Badge
                                        variant={company.status === "Active" ? "default" : "secondary"}
                                        className={`${
                                            company.status === "Active"
                                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full mr-2 ${
                                                company.status === "Active" ? "bg-green-500" : "bg-gray-400"
                                            }`}
                                        />
                                        {company.status}
                                    </Badge>
                                </div>

                                {/* Actions */}
                                <div className="col-span-2 flex justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-32">
                                            <DropdownMenuItem className="flex items-center gap-2">
                                                <Eye className="h-4 w-4" />
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                                Remove
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="flex items-center gap-2"
                >
                    ← Previous
                </Button>

                <div className="flex items-center gap-2">
                    {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
                        <Button
                            key={index}
                            variant={currentPage === page ? "default" : "ghost"}
                            size="sm"
                            className={`w-8 h-8 p-0 ${page === "..." ? "cursor-default hover:bg-transparent" : ""}`}
                            onClick={() => typeof page === "number" && setCurrentPage(page)}
                            disabled={page === "..."}
                        >
                            {page}
                        </Button>
                    ))}
                </div>

                <Button variant="outline" onClick={() => setCurrentPage(currentPage + 1)} className="flex items-center gap-2">
                    Next →
                </Button>
            </div>
        </div>
    )
}
