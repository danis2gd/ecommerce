import { useDispatch } from "react-redux";
import { MOCK_PRODUCT } from "../../enumeration/MockValues";
import { formatCurrency } from "../../util/formatting/CurrencyFormatter";
import { ACTION } from "../../util/state/Action";
import { Product } from "../../util/state/Product";

interface IProps {
    product: Product;
};

export const BasketItem: React.FC = ({product}: IProps) => {
    const dispatch = useDispatch();

    const increment = (id: number, sku: string): void => {
        dispatch({
            type: ACTION.INCREMENT_PRODUCT,
            payload: {
                id,
                sku
            },
        });
    };

    const decrement = (id: number, sku: string): void => {
        dispatch({
            type: ACTION.DECREMENT_PRODUCT,
            payload: {
                id,
                sku
            },
        });
    };

    const remove = (id: number, sku: string): void => {
        dispatch({
            type: ACTION.REMOVE_FROM_CART,
            payload: {
                id,
                sku
            },
        });
    };

    return (
        <div className={"w-full flex flex-row text-white-base mb-3"}>
            <div className={"max-w-100 sm:max-w-200 max-h-100 sm:max-h-200 mr-3"}>
                <picture className={"w-full h-full flex"}>
                    <source
                        srcSet={MOCK_PRODUCT.IMAGE_PATH}
                        media={"(min-width: 800px)"}
                    />
                    <img
                        className={"object-cover w-full rounded-md"}
                        src={MOCK_PRODUCT.IMAGE_PATH}
                        alt={MOCK_PRODUCT.IMAGE_ALT_TEXT}
                    />
                </picture>
            </div>

            <div className={"flex-1 flex flex-col sm:flex-row relative"}>
                <div className={"w-full sm:w-1/2 flex flex-col"}>
                    <h3 className={"w-full mb-1"}>
                        {MOCK_PRODUCT.NAME}
                    </h3>

                    <div className={"mb-1"}>
                        {product.getAttributes().map(attribute => {
                            return (
                                <div key={attribute.handle} className={"text-sm"}>
                                    {attribute.name}: {attribute.value}
                                </div>
                            );
                        })}
                    </div>

                    <div className={"w-full font-semibold"}>
                        {formatCurrency(product.getPrice())}
                    </div>
                </div>

                <div className={"w-full sm:w-1/4"}>
                    <div className={"flex flex-row h-10 max-w-150 rounded-lg relative bg-transparent my-1 sm:my-0"}>
                        <button
                            className={"bg-theme-primary text-white-base hover:bg-theme-primarydark h-full w-20 rounded-l cursor-pointer outline-none"}
                            onClick={() => decrement(product.id, product.getSku())}
                        >
                            <span className={"m-auto text-2xl font-thin"}>−</span>
                        </button>

                        <span className={"w-full outline-none text-center leading-10 focus:outline-none bg-theme-primary sm:font-semibold sm:text-md text-white-base"}>
                            {product.getQuantity()}
                        </span>
                       
                        <button 
                            className={"bg-theme-primary text-white-base hover:bg-theme-primarydark h-full w-20 rounded-r cursor-pointer outline-none"}
                            onClick={() => increment(product.id, product.getSku())}
                        >
                            <span className={"m-auto text-2xl font-thin"}>+</span>
                        </button>
                    </div>
                </div>

                <div className={"sm:w-1/4 text-left sm:text-right absolute top-0 right-0 sm:relative"}>
                    <span onClick={() => remove(product.id, product.getSku())}>
                        Remove
                    </span>
                </div>
            </div>
        </div>
    )
};
