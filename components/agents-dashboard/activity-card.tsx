import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, FileText, Users, UserCheck } from "lucide-react"
import Image from "next/image"
import fac from '/public/assets/icons/fac1.svg'

export function ActivityCard() {
    return (
        <Card className="bg-[#FAF9F6] border border-gray-300 rounded-2xl max-w-5xl mx-auto">
            <CardContent className="px-8">
                <div className="flex items-center justify-between my-4">
                    <h2 className="text-2xl font-semibold text-[#003418]">Your Activity at a Glance</h2>
                    <div className="flex items-center justify-end">
                        <div className="flex items-center gap-4">
                            <Select defaultValue="this-month">
                                <SelectTrigger className="w-40 bg-stone-50 border-gray-300 rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="this-month">This Month</SelectItem>
                                    <SelectItem value="last-month">Last Month</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className=" bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-4 py-2 flex items-center gap-2 ml-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            All Analytics
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between w-full gap-8">


                    {/* Cards grid on the right */}
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        {/* Total Sales - Single (1 column only) */}
                        <div className="space-y-3 p-4 rounded-2xl bg-white col-span-1">
                            <div className="flex items-center gap-3">
                                <Building2 className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-700 font-medium">Total Sales</span>
                            </div>
                            <div className="flex gap-8 justify-between items-center">
                                <div className="text-left">
                                    <div className="text-3xl font-bold text-gray-900">123</div>
                                </div>
                                <div className="text-left">
                                    <Button
                                        variant="link"
                                        className="text-gray-500 p-0 h-auto text-sm hover:text-gray-700"
                                    >
                                        See All →
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Wrap the next two in a nested grid to take 2 in the same row */}
                        <div className="col-span-2 grid grid-cols-2 gap-4">
                            {/* Total Products */}
                            <div className="space-y-3 p-4 rounded-2xl bg-white">
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700 font-medium">Total Products</span>
                                </div>
                                <div className="flex gap-4 justify-between items-center">
                                    <div className="text-left">
                                        <div className="text-3xl font-bold text-gray-900">123</div>
                                    </div>
                                    <div className="text-left">
                                        <Button
                                            variant="link"
                                            className="text-gray-500 p-0 h-auto text-sm hover:text-gray-700"
                                        >
                                            See All →
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Total Commission */}
                            <div className="space-y-3 p-4 rounded-2xl bg-white">
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700 font-medium">Total Commission</span>
                                </div>
                                <div className="flex gap-4 justify-between items-center">
                                    <div className="text-left">
                                        <div className="text-3xl font-bold text-gray-900">123</div>
                                    </div>
                                    <div className="text-left">
                                        <Button
                                            variant="link"
                                            className="text-gray-500 p-0 h-auto text-sm hover:text-gray-700"
                                        >
                                            See All →
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Image on the left */}
                    <div className="flex-shrink-0 relative">
                        <div className="w-64 h-48  rounded-2xl flex items-center justify-center">
                            <Image
                                src={fac}
                                alt="Analytics illustration with person and magnifying glass"
                                width={300}
                                height={250}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}