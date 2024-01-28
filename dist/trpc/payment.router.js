"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
var zod_1 = require("zod");
var trpc_1 = require("./trpc");
var server_1 = require("@trpc/server");
var get_payload_1 = require("../get-payload");
var stripe_1 = require("../lib/stripe");
exports.paymentRouter = (0, trpc_1.router)({
    createSession: trpc_1.privateProcedure
        .input(zod_1.z.object({ productIds: zod_1.z.array(zod_1.z.string()) }))
        .mutation(function (_a) {
        var ctx = _a.ctx, input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var user, productIds, payload, products, filteredProducts, order, line_items, stripeSession, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = ctx.user;
                        productIds = input.productIds;
                        if (productIds.length === 0) {
                            throw new server_1.TRPCError({ code: "BAD_REQUEST" });
                        }
                        return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "products",
                                where: {
                                    id: {
                                        in: productIds,
                                    },
                                },
                            })];
                    case 2:
                        products = (_b.sent()).docs;
                        filteredProducts = products.filter(function (product) {
                            return Boolean(product.priceId);
                        });
                        return [4 /*yield*/, payload.create({
                                collection: "orders",
                                data: {
                                    _isPaid: false,
                                    products: filteredProducts.map(function (product) { return product.id; }),
                                    user: user.id,
                                },
                            })];
                    case 3:
                        order = _b.sent();
                        line_items = [];
                        filteredProducts.forEach(function (product) {
                            line_items.push({
                                price: product.priceId,
                                quantity: 1,
                            });
                        });
                        line_items.push({
                            price: "price_1OdaTIIYkoTBRpihx5HsGVyD",
                            quantity: 1,
                            adjustable_quantity: {
                                enabled: false,
                            },
                        });
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, stripe_1.stripe.checkout.sessions.create({
                                success_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/thank-you?orderId=").concat(order.id),
                                cancel_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/cart"),
                                payment_method_types: ["card"],
                                mode: "payment",
                                metadata: {
                                    userId: user.id,
                                    orderId: order.id,
                                },
                                line_items: line_items,
                            })];
                    case 5:
                        stripeSession = _b.sent();
                        return [2 /*return*/, {
                                url: stripeSession.url,
                            }];
                    case 6:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, {
                                url: null,
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }),
    pollOrderStatus: trpc_1.publicProcedure
        .input(zod_1.z.object({ orderId: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var orderId, payload, orders, order;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orderId = input.orderId;
                        return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "orders",
                                where: {
                                    id: {
                                        equals: orderId,
                                    },
                                },
                            })];
                    case 2:
                        orders = (_b.sent()).docs;
                        if (!orders.length) {
                            throw new server_1.TRPCError({ code: "NOT_FOUND" });
                        }
                        order = orders[0];
                        return [2 /*return*/, {
                                isPaid: order._isPaid,
                            }];
                }
            });
        });
    }),
});
