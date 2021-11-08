import React, { useState ,useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  FormControlLabel,
  IconButton,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'src/store';
import { getData } from './../../../slices/post';
import {
  Image as ImageIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from 'react-feather';


const applyFilters = (products, query, filters) => {
  return products.filter((product) => {
    let matches = true;

    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }

    if (filters.category && product.category !== filters.category) {
      matches = false;
    }

    if (filters.availability) {
      if (filters.availability === 'available' && !product.isAvailable) {
        matches = false;
      }

      if (filters.availability === 'unavailable' && product.isAvailable) {
        matches = false;
      }
    }

    if (filters.inStock && !['in_stock', 'limited'].includes(product.inventoryType)) {
      matches = false;
    }

    if (filters.isShippable && !product.isShippable) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (products, page, limit) => {
  return products.slice(page * limit, page * limit + limit);
};

const useStyles = makeStyles((theme) => ({
  root: {},
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  queryField: {
    width: 500
  },
  categoryField: {
    flexBasis: 200
  },
  availabilityField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200
  },
  stockField: {
    marginLeft: theme.spacing(2)
  },
  shippableField: {
    marginLeft: theme.spacing(2)
  },
  imageCell: {
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0
  },
  image: {
    height: 68,
    width: 68
  }
}));

const ViewPost = ({ className, products, ...rest }) => {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.view);
  const classes = useStyles();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: null,
    availability: null,
    inStock: null,
    isShippable: null
  });
  useEffect(() => {
    console.log('heheh')
    dispatch(getData());
  }, []);
  const handleSelectAllProducts = (event) => {
    setSelectedProducts(event.target.checked
      ? products.map((product) => product.id)
      : []);
  };

  const handleSelectOneProduct = (event, productId) => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts((prevSelected) => [...prevSelected, productId]);
    } else {
      setSelectedProducts((prevSelected) => prevSelected.filter((id) => id !== productId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, query, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, limit);
  const selectedSomeProducts = selectedProducts.length > 0 && selectedProducts.length < products.length;
  const selectedAllProducts = selectedProducts.length === products.length;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1200}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllProducts}
                    indeterminate={selectedSomeProducts}
                    onChange={handleSelectAllProducts}
                  />
                </TableCell>
                <TableCell />
                <TableCell>
                  Post Id
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  User Id
                </TableCell>
                <TableCell>
                  Body
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {
                    view.map((post)=>{
                        const isProductSelected = selectedProducts.includes(post.id);
                        return(
                            <TableRow
                            hover
                            key={post._id}
                            >
                   <TableCell padding="checkbox">
                      <Checkbox
                        checked={isProductSelected}
                        onChange={(event) => handleSelectOneProduct(event, post._id)}
                        value={isProductSelected}
                      />
                    </TableCell>
                    <TableCell className={classes.imageCell}>
                      {post.image ? (
                        <img
                          alt="Product"
                          src={post.image}
                          className={classes.image}
                        />
                      ) : (
                        <Box
                          p={2}
                          bgcolor="background.dark"
                        >
                          <SvgIcon>
                            <ImageIcon />
                          </SvgIcon>
                        </Box>
                      )}
                    </TableCell>
                                <TableCell>
                                    {post._id}
                                </TableCell>
                                <TableCell>
                                    {post.title}
                                </TableCell>
                                <TableCell>
                                    {post.userId}
                                </TableCell>
                                <TableCell>
                                    {post.body}
                                </TableCell>
                                <TableCell align="right">
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                            </TableRow>
                        )
                    })
                }                
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredProducts.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ViewPost.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array.isRequired
};

ViewPost.defaultProps = {
  products: []
};

export default ViewPost;
